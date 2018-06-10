/*
 * @Author: lkspc
 * @Date: 2017-10-02 00:19:50
 * @Last Modified by: lkspc
 * @Last Modified time: 2017-10-11 17:06:31
 */

'use strict';

const Jimp = require('jimp');
const FD = require('./fd');
const FR = require('./fr');
const TypeDef = require('./typedef');
const libc = require('./libc');

const ref = TypeDef.Ref;

class ArcFace {

  /**
   * @constructor
   * @memberof ArcFace
   */
  constructor() {
    this.parseImage = ArcFace.parseImage;
    // pointer array to be free
    this.pointers = [];
  }

  /**
   * initialize FD engine
   *
   * @param {String} libFile
   * @param {Object} opts
   * @param {String} opts.appId
   * @param {String} opts.sdkKey
   * @param {Number} opts.workSize
   * @param {Number} opts.maxFace=1
   * @param {Number} opts.scale=16
   */
  initialFDEngine(libFile, opts) {
    // init FD
    this.FD = FD(libFile);

    this.FDWorkSize = opts.workSize || 40 * 1024 * 1024;
    this.pFDEngine = ref.alloc(TypeDef.MHandle);
    this.pFDWorkMem = libc.malloc(this.FDWorkSize);

    const nRet = this.FD.AFD_FSDK_InitialFaceEngine(
      opts.appId,
      opts.sdkKey,
      this.pFDWorkMem,
      this.FDWorkSize,
      this.pFDEngine,
      TypeDef.AFD_FSDK_OPF_0_HIGHER_EXT,
      opts.scale || 16,
      opts.maxFace || 1
    );
    this.hFDEngine = this.pFDEngine.deref();

    if (nRet !== 0) {
      this.uninitialFDEngine();
      throw new Error('Initial Face Detection failed, code ' + nRet);
    }
  }

  uninitialFDEngine() {
    if (!!this.pFDWorkMem) {
      libc.free(this.pFDWorkMem);
    }
    if (!!this.pFDEngine && !this.hFDEngine.isNull()) {
      const nRet = this.FD.AFD_FSDK_UninitialFaceEngine(this.hFDEngine);
      if (nRet !== 0) {
        throw new Error('Uninitial Face Detection Engine failed, code ' + nRet);
      }
    }
  }

  /**
   * initialize FR engine
   *
   * @param {String} libFile
   * @param {Object} opts
   * @param {String} opts.appId
   * @param {String} opts.sdkKey
   * @param {Number} opts.workSize
   */
  initialFREngine(libFile, opts) {
    // init FR
    this.FR = FR(libFile);

    this.FRWorkSize = opts.workSize || 40 * 1024 * 1024;
    this.pFREngine = ref.alloc(TypeDef.MHandle);
    this.pFRWorkMem = libc.malloc(this.FRWorkSize);

    const nRet = this.FR.AFR_FSDK_InitialEngine(
      opts.appId,
      opts.sdkKey,
      this.pFRWorkMem,
      this.FRWorkSize,
      this.pFREngine
    );
    this.hFREngine = this.pFREngine.deref();

    if (nRet !== 0) {
      this.uninitialFREngine();
      throw new Error('Initial Face Recognition Engine failed, code ' + nRet);
    }
  }

  uninitialFREngine() {
    if (!!this.pFRWorkMem) {
      libc.free(this.pFRWorkMem);
    }
    if (!!this.pFREngine && !this.hFREngine.isNull()) {
      const nRet = this.FR.AFR_FSDK_UninitialEngine(this.hFREngine);
      if (nRet !== 0) {
        throw new Error('Uninitial Face Recognition Engine failed, code ' + nRet);
      }
    }
  }

  freePointers() {
    this.pointers.forEach(ptr => !ptr.isNull() && libc.free(ptr));
    this.pointers = [];
  }

  uninitial() {
    this.uninitialFDEngine();
    this.uninitialFREngine();
    this.freePointers();
  }

  /**
   * extract face feature
   *
   * @param {TypeDef.ASVLOFFSCREEN} asvl
   * @param {TypeDef.MRECT} rcFace
   * @param {TypeDef.AFD_FSDK_OrientCode} orient
   * @returns
   * @memberof Face
   */
  extractFeature(asvl, rcFace, orient) {
    if (this.hFREngine.isNull()) {
      throw new Error('FR Engine is uninitialized');
    }

    const faceInput = new TypeDef.AFR_FSDK_FACEINPUT();
    faceInput.lOrient = orient;
    faceInput.rcFace.left = rcFace.left;
    faceInput.rcFace.top = rcFace.top;
    faceInput.rcFace.right = rcFace.right;
    faceInput.rcFace.bottom = rcFace.bottom;

    const faceModel = new TypeDef.AFR_FSDK_FACEMODEL();
    const nRet = this.FR.AFR_FSDK_ExtractFRFeature(this.hFREngine, asvl.ref(), faceInput.ref(), faceModel.ref());

    if (nRet !== 0) {
      throw new Error('Extract FR Feature failed, code ' + nRet);
    }

    const _faceModel = new TypeDef.AFR_FSDK_FACEMODEL();
    _faceModel.lFeatureSize = faceModel.lFeatureSize;
    _faceModel.pbFeature = libc.malloc(_faceModel.lFeatureSize);
    // add to free pointers
    this.pointers.push(_faceModel.pbFeature);
    // copy
    libc.memcpy(_faceModel.pbFeature.address(), faceModel.pbFeature.address(), _faceModel.lFeatureSize);

    return _faceModel;
  }

  /**
   * face compare
   *
   * @param {TypeDef.AFR_FSDK_FACEMODEL} faceModel1
   * @param {TypeDef.AFR_FSDK_FACEMODEL} faceModel2
   * @returns {Number} similarity
   * @memberof Face
   */
  compare(faceModel1, faceModel2) {
    if (this.hFREngine.isNull()) {
      throw new Error('FR Engine is uninitialized');
    }

    const pSimil = ref.alloc(TypeDef.MFloat);
    const nRet = this.FR.AFR_FSDK_FacePairMatching(this.hFREngine, faceModel1.ref(), faceModel2.ref(), pSimil);

    if (nRet !== 0) {
      throw new Error('Face Pair Matching failed, code ' + nRet);
    }

    return pSimil.deref();
  }

  /**
   * face detect
   *
   * @param {TypeDef.ASVLOFFSCREEN} asvl
   */
  detect(asvl) {
    if (this.hFDEngine.isNull()) {
      throw Error('FD Engine is uninitialized');
    }

    const pFaceRes = ref.alloc(TypeDef.LPAFD_FSDK_FACERES);
    const nRet = this.FD.AFD_FSDK_StillImageFaceDetection(this.pFDEngine.deref(), asvl.ref(), pFaceRes);

    if (nRet !== 0) {
      throw Error('Face Detection failed, code ' + nRet);
    }

    const faceRes = pFaceRes.deref().deref();
    const rect = new TypeDef.MRECT();
    const orientBuf = new Buffer(TypeDef.AFD_FSDK_OrientCode.size);

    // output faces
    const faces = {
      nFace: faceRes.nFace,
      rcFace: [],
      lfaceOrient: []
    };

    for (let i = 0; i < faceRes.nFace; ++i) {
      libc.memcpy(rect.ref().address(), faceRes.rcFace.address() + i * TypeDef.MRECT.size, TypeDef.MRECT.size)
      libc.memcpy(orientBuf.address(), faceRes.lfaceOrient.address() + i * TypeDef.AFD_FSDK_OrientCode.size, TypeDef.AFD_FSDK_OrientCode.size);

      faces.rcFace.push({
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom
      });
      faces.lfaceOrient.push(ref.get(orientBuf, 0, TypeDef.AFD_FSDK_OrientCode));
    }

    return faces;
  }

  /**
   * parse image
   *
   * @static
   * @param {String} imgFile
   * @returns {Promise.<ASVLOFFSCREEN>}
   * @memberof Face
   */
  static parseImage(imgFile) {
    return Jimp
      .read(imgFile)
      .then(image => {
        const { width, height, data } = image.bitmap;
        const lineByte = ~~((width * 3 + 3) / 4) * 4;

        const imageBuf = new Buffer(lineByte * height);
        let index = 0;

        image.scan(0, 0, width, height, function(x, y, idx) {
          // blue
          imageBuf[index] = data[idx + 2];
          // green
          imageBuf[index + 1] = data[idx + 1];
          // red
          imageBuf[index + 2] = data[idx];

          index += 3;
        });

        const offInput = new TypeDef.ASVLOFFSCREEN();
        offInput.u32PixelArrayFormat = TypeDef.ASVL_PAF_RGB24_B8G8R8;
        offInput.i32Width = width;
        offInput.i32Height = height;
        offInput.ppu8Plane[0] = imageBuf;
        offInput.pi32Pitch[0] = offInput.i32Width * 3;

        return offInput;
      });
  }

}

ArcFace.FD = FD;
ArcFace.FR = FR;
ArcFace.Lib = libc;
ArcFace.TypeDef = TypeDef;
ArcFace.Jimp = Jimp;

module.exports = ArcFace;
