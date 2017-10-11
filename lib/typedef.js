/*
 * @Author: lkspc 
 * @Date: 2017-10-08 17:41:48 
 * @Last Modified by: lkspc
 * @Last Modified time: 2017-10-11 10:23:29
 */

'use strict';

const ref = require('ref');
const StructType = require('ref-struct');
const ArrayType = require('ref-array');

/**
 * common data types and definitions
 */
const typedef = module.exports = {};

typedef.Ref = ref;
typedef.Struct = StructType;
typedef.Array = ArrayType;

/**
 * data types
 */

/**
 * basic types
 */

typedef.MLong = ref.types.long;
typedef.MFloat = ref.types.float;
typedef.MDouble = ref.types.double;
typedef.MByte = ref.types.uchar;
typedef.MWord = ref.types.ushort;
typedef.MDWord = ref.types.uint;
typedef.MHandle = ref.refType(ref.types.void);
typedef.MChar = ref.types.char;
typedef.MBool = ref.types.long;
typedef.MVoid = ref.types.void;
typedef.MPVoid = ref.refType(ref.types.void);
typedef.MPChar = ref.types.CString;
typedef.MShort = ref.types.short;
typedef.MPCChar = ref.types.CString;

typedef.MRESULT = typedef.MLong;
typedef.MCOLORREF = typedef.MDWord;

typedef.MInt8 = ref.types.int8;
typedef.MUInt8 = ref.types.uint8;
typedef.MInt16 = ref.types.int16;
typedef.MUInt16 = ref.types.uint16;
typedef.MInt32 = ref.types.int32;
typedef.MUInt32 = ref.types.uint32;

/**
 * ASVLOFFSCREEN
 */

typedef.__tag_rect = StructType({
  left: typedef.MInt32,
  top: typedef.MInt32,
  right: typedef.MInt32,
  bottom: typedef.MInt32
});
typedef.MRECT = typedef.__tag_rect;
typedef.PMRECT = ref.refType(typedef.__tag_rect);

typedef.__tag_point = StructType({
  x: typedef.MInt32,
  y: typedef.MInt32
});
typedef.MPOINT = typedef.__tag_point;
typedef.PMPOINT = ref.refType(typedef.__tag_point);

typedef.__tag_ASVL_OFFSCREEN = StructType({
  u32PixelArrayFormat: typedef.MUInt32,
  i32Width: typedef.MInt32,
  i32Height: typedef.MInt32,
  ppu8Plane: ArrayType(ref.refType(typedef.MUInt8), 4),
  pi32Pitch: ArrayType(typedef.MInt32, 4)
});
typedef.ASVLOFFSCREEN = typedef.__tag_ASVL_OFFSCREEN;
typedef.LPASVLOFFSCREEN = ref.refType(typedef.__tag_ASVL_OFFSCREEN);

typedef.__tag_ASVL_VERSION = StructType({
  lCodebase: typedef.MLong,
  lMajor: typedef.MLong,
  lMinor: typedef.MLong,
  lBuild: typedef.MLong,
  Version: typedef.MPCChar,
  BuildDate: typedef.MPCChar,
  CopyRight: typedef.MPCChar
});
typedef.ASVL_VERSION = typedef.__tag_ASVL_VERSION;

/**
 * FD
 */

typedef.AFD_FSDK_OrientPriority = typedef.MInt32;
typedef.AFD_FSDK_OrientCode = typedef.MInt32;

typedef.AFD_FSDK_FACERES = StructType({
  nFace: typedef.MInt32,
  rcFace: ref.refType(typedef.MRECT),
  lfaceOrient: ref.refType(typedef.AFD_FSDK_OrientCode)
});
typedef.LPAFD_FSDK_FACERES = ref.refType(typedef.AFD_FSDK_FACERES);

typedef.AFD_FSDK_Version = StructType({
  lCodebase: typedef.MLong,
  lMajor: typedef.MLong,
  lMinor: typedef.MLong,
  lBuild: typedef.MLong,
  Version: typedef.MPCChar,
  BuildDate: typedef.MPCChar,
  CopyRight: typedef.MPCChar
});
typedef.LPAFD_FSDK_Version = ref.refType(typedef.AFD_FSDK_Version);

/**
 * FR
 */

typedef.AFR_FSDK_OrientCode = typedef.MInt32;

typedef.AFR_FSDK_FACEINPUT = StructType({
  rcFace: typedef.MRECT,
  lOrient: typedef.AFR_FSDK_OrientCode
});
typedef.LPAFR_FSDK_FACEINPUT = ref.refType(typedef.AFR_FSDK_FACEINPUT);

typedef.AFR_FSDK_FACEMODEL = StructType({
  pbFeature: ref.refType(typedef.MByte),
  lFeatureSize: typedef.MInt32
});
typedef.LPAFR_FSDK_FACEMODEL = ref.refType(typedef.AFR_FSDK_FACEMODEL);

typedef.AFR_FSDK_Version = StructType({
  lCodebase: typedef.MInt32,
  lMajor: typedef.MInt32,
  lMinor: typedef.MInt32,
  lBuild: typedef.MInt32,
  lFeatureLevel: typedef.MInt32,
  Version: typedef.MPChar,
  BuildDate: typedef.MPChar,
  CopyRight: typedef.MPChar
});

/**
 * definitions
 */

typedef.ASVL_PAF_RGB16_B5G6R5 = 0x101;
typedef.ASVL_PAF_RGB16_B5G5R5 = 0x102;
typedef.ASVL_PAF_RGB16_B4G4R4 = 0x103;
typedef.ASVL_PAF_RGB16_B5G5R5T = 0x104;
typedef.ASVL_PAF_RGB16_R5G6B5 = 0x105;
typedef.ASVL_PAF_RGB16_R5G5B5 = 0x106;
typedef.ASVL_PAF_RGB16_R4G4B4 = 0x107;

typedef.ASVL_PAF_RGB24_B8G8R8 = 0x201;
typedef.ASVL_PAF_RGB24_B6G6R6 = 0x202;
typedef.ASVL_PAF_RGB24_B6G6R6T = 0x203;
typedef.ASVL_PAF_RGB24_R8G8B8 = 0x204;
typedef.ASVL_PAF_RGB24_R6G6B6 = 0x205;

typedef.ASVL_PAF_RGB32_B8G8R8 = 0x301;
typedef.ASVL_PAF_RGB32_B8G8R8A8 = 0x302;
typedef.ASVL_PAF_RGB32_R8G8B8 = 0x303;
typedef.ASVL_PAF_RGB32_A8R8G8B8 = 0x304;
typedef.ASVL_PAF_RGB32_R8G8B8A8 = 0x305;

typedef.ASVL_PAF_YUV = 0x401;
typedef.ASVL_PAF_YVU = 0x402;
typedef.ASVL_PAF_UVY = 0x403;
typedef.ASVL_PAF_VUY = 0x404;

typedef.ASVL_PAF_YUYV = 0x501;
typedef.ASVL_PAF_YVYU = 0x502;
typedef.ASVL_PAF_UYVY = 0x503;
typedef.ASVL_PAF_VYUY = 0x504;
typedef.ASVL_PAF_YUYV2 = 0x505;
typedef.ASVL_PAF_YVYU2 = 0x506;
typedef.ASVL_PAF_UYVY2 = 0x507;
typedef.ASVL_PAF_VYUY2 = 0x508;
typedef.ASVL_PAF_YYUV = 0x509;

typedef.ASVL_PAF_I420 = 0x601;
typedef.ASVL_PAF_I422V = 0x602;
typedef.ASVL_PAF_I422H = 0x603;
typedef.ASVL_PAF_I444 = 0x604;
typedef.ASVL_PAF_YV12 = 0x605;
typedef.ASVL_PAF_YV16V = 0x606;
typedef.ASVL_PAF_YV16H = 0x607;
typedef.ASVL_PAF_YV24 = 0x608;

typedef.ASVL_PAF_GRAY = 0x701;

typedef.ASVL_PAF_NV12 = 0x801;
typedef.ASVL_PAF_NV21 = 0x802;
typedef.ASVL_PAF_LPI422H = 0x803;
typedef.ASVL_PAF_LPI422H2 = 0x804;
typedef.ASVL_PAF_NV41 = 0x805;

typedef.ASVL_PAF_NEG_UYVY = 0x901;
typedef.ASVL_PAF_NEG_I420 = 0x902;

typedef.ASVL_PAF_MONO_UYVY = 0xa01;
typedef.ASVL_PAF_MONO_I420 = 0xa02;

typedef.ASVL_PAF_P8_YUYV = 0xb03;

typedef.ASVL_PAF_SP16UNIT = 0xc01;
typedef.ASVL_PAF_DEPTH_U16 = 0xc02;

typedef.ASVL_PAF_RAW10_RGGB_10B = 0xd01;
typedef.ASVL_PAF_RAW10_GRBG_10B = 0xd02;
typedef.ASVL_PAF_RAW10_GBRG_10B = 0xd03;
typedef.ASVL_PAF_RAW10_BGGR_10B = 0xd04;

typedef.ASVL_PAF_RAW12_RGGB_12B = 0xd05;
typedef.ASVL_PAF_RAW12_GRBG_12B = 0xd06;
typedef.ASVL_PAF_RAW12_GBRG_12B = 0xd07;
typedef.ASVL_PAF_RAW12_BGGR_12B = 0xd08;

typedef.ASVL_PAF_RAW10_RGGB_16B = 0xd09;
typedef.ASVL_PAF_RAW10_GRBG_16B = 0xd0A;
typedef.ASVL_PAF_RAW10_GBRG_16B = 0xd0B;
typedef.ASVL_PAF_RAW10_BGGR_16B = 0xd0C;

typedef.ASVL_PAF_RAW10_GRAY_10B = 0xe01;

typedef.ASVL_PAF_RAW10_GRAY_16B = 0xe81;

typedef.AFD_FSDK_OPF_0_ONLY = 0x1;
typedef.AFD_FSDK_OPF_90_ONLY = 0x2;
typedef.AFD_FSDK_OPF_270_ONLY = 0x3;
typedef.AFD_FSDK_OPF_180_ONLY = 0x4;
typedef.AFD_FSDK_OPF_0_HIGHER_EXT = 0x5;

typedef.AFD_FSDK_FOC_0 = 0x1;
typedef.AFD_FSDK_FOC_90 = 0x2;
typedef.AFD_FSDK_FOC_270 = 0x3;
typedef.AFD_FSDK_FOC_180 = 0x4;
typedef.AFD_FSDK_FOC_30 = 0x5;
typedef.AFD_FSDK_FOC_60 = 0x6;
typedef.AFD_FSDK_FOC_120 = 0x7;
typedef.AFD_FSDK_FOC_150 = 0x8;
typedef.AFD_FSDK_FOC_210 = 0x9;
typedef.AFD_FSDK_FOC_240 = 0xa;
typedef.AFD_FSDK_FOC_300 = 0xb;
typedef.AFD_FSDK_FOC_330 = 0xc;

typedef.AFR_FSDK_FOC_0 = 0x1;
typedef.AFR_FSDK_FOC_90 = 0x2;
typedef.AFR_FSDK_FOC_270 = 0x3;
typedef.AFR_FSDK_FOC_180 = 0x4;
typedef.AFR_FSDK_FOC_30 = 0x5;
typedef.AFR_FSDK_FOC_60 = 0x6;
typedef.AFR_FSDK_FOC_120 = 0x7;
typedef.AFR_FSDK_FOC_150 = 0x8;
typedef.AFR_FSDK_FOC_210 = 0x9;
typedef.AFR_FSDK_FOC_240 = 0xa;
typedef.AFR_FSDK_FOC_300 = 0xb;
typedef.AFR_FSDK_FOC_330 = 0xc;