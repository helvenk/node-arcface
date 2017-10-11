/*
 * @Author: lkspc 
 * @Date: 2017-10-08 18:45:08 
 * @Last Modified by: lkspc
 * @Last Modified time: 2017-10-11 10:50:11
 */

'use strict';

const ffi = require('ffi');
const TypeDef = require('./typedef');
const ref = TypeDef.Ref;

/**
 * Initialize FD module
 */
module.exports = function init(libFile) {
  // export functions from lib file
  return ffi.Library(libFile, {
    // Initialize the face detection engine
    AFD_FSDK_InitialFaceEngine: [TypeDef.MRESULT, [
      TypeDef.MPChar,
      TypeDef.MPChar,
      ref.refType(TypeDef.MByte),
      TypeDef.MInt32,
      ref.refType(TypeDef.MHandle),
      TypeDef.AFD_FSDK_OrientPriority,
      TypeDef.MInt32,
      TypeDef.MInt32
    ]],
    // detect face in the input image
    AFD_FSDK_StillImageFaceDetection: [TypeDef.MRESULT, [
      TypeDef.MHandle,
      TypeDef.LPASVLOFFSCREEN,
      ref.refType(TypeDef.LPAFD_FSDK_FACERES)
    ]],
    // Uninitialize the detection module
    AFD_FSDK_UninitialFaceEngine: [TypeDef.MRESULT, [TypeDef.MHandle]],
    // get version information of face detection library
    AFD_FSDK_GetVersion: [ref.refType(TypeDef.AFD_FSDK_Version), [TypeDef.MHandle]]
  });
}