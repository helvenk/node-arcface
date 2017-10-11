/*
 * @Author: lkspc 
 * @Date: 2017-10-08 18:45:08 
 * @Last Modified by: lkspc
 * @Last Modified time: 2017-10-10 15:51:59
 */

'use strict';

const ffi = require('ffi');
const TypeDef = require('./typedef');
const ref = TypeDef.Ref;

/**
 * Initialize FR module
 */
module.exports = function init(libFile) {
  // export functions from lib file
  return ffi.Library(libFile, {
    // Initialize the face recognition engine
    AFR_FSDK_InitialEngine: [TypeDef.MRESULT, [
      TypeDef.MPChar,
      TypeDef.MPChar,
      ref.refType(TypeDef.MByte),
      TypeDef.MInt32,
      ref.refType(TypeDef.MHandle)
    ]],
    // Get one face's feature
    AFR_FSDK_ExtractFRFeature: [TypeDef.MRESULT, [
      TypeDef.MHandle,
      TypeDef.LPASVLOFFSCREEN,
      TypeDef.LPAFR_FSDK_FACEINPUT,
      TypeDef.LPAFR_FSDK_FACEMODEL
    ]],
    // face authentication, comparing 2 faces
    AFR_FSDK_FacePairMatching: [TypeDef.MRESULT, [
      TypeDef.MHandle,
      ref.refType(TypeDef.AFR_FSDK_FACEMODEL),
      ref.refType(TypeDef.AFR_FSDK_FACEMODEL),
      ref.refType(TypeDef.MFloat)
    ]],
    // Uninitialize the recognition module
    AFR_FSDK_UninitialEngine: [TypeDef.MRESULT, [TypeDef.MHandle]],
    // get version information of face recognition library
    AFR_FSDK_GetVersion: [ref.refType(TypeDef.AFR_FSDK_Version), [TypeDef.MHandle]]
  });
}