# Node-ArcFace
### Arcsoft Face Cognition Engine.

 [ArcFace](http://www.arcsoft.com.cn/ai/arcface.html) is a __Face Cognition Engine__, which contains __Face Detection__, __Face Recognition__ and __Face Tracking__. 

This module is a wrapper of ArcFace C++ SDK used for nodejs.

## Installation

with npm
```bash
$ npm install arcface --save
```
with yarn
```bash
$ yarn add arcface
```

## Usage

### Using Raw SDK

This way you need to know how to use C/C++ `pointer`, `struct` and `array` in nodejs. See [ref](https://github.com/TooTallNate/ref).
```javascript
const ArcFace = require('arcface');

const TypeDef = ArcFace.TypeDef;
const Lib = ArcFace.Lib;

// init FD module
const FD = ArcFace.FD('/path/to/fdsdk.dll');
// init FR module
const FR = ArcFace.FR('/path/to/frsdk.dll');

// setting initial variables
const APPID = 'yourAppId';
const FR_SDKKey = 'yourFRSDKKey';
const WORKBUF_SIZE = 40 * 1024 * 1024;
const nScale = 16;
const nMaxFace = 10;

// alloc memory
const phEngine = TypeDef.Ref.alloc(TypeDef.MHandle);
const pWorkMem = Lib.malloc(WORKBUF_SIZE);

// initial FR Engine
const nRet = FR.AFR_FSDK_InitialEngine(
    APPID, 
    FR_SDKKey, 
    pWorkMem, 
    WORKBUF_SIZE, 
    phEngine
);

// other usages are same as the official sample code
// ...


```

### Using Wrapped SDK

```javascript
const ArcFace = require('arcface');

const arcface = new ArcFace();

// init FD Engine
arcface.initialFDEngine('/path/to/fd.dll', {
    appId: 'yourAppId',
    sdkKey: 'yourFDKey'
});
// init FR Engine
arcface.initialFREngine('/path/to/fr.dll', {
    appId: 'yourAppId',
    sdkKey: 'yourFRKey'
});

// parse image file to ASVLOFFSCREEN
const asvl = await arcface.parseImage('/path/to/image.jpg');

// face detection
const faces = arcface.detect(asvl);

// extract face featrue
const faceModel = arcface.extractFeature(asvl, faces.rcFace[0], faces.lfaceOrient[0]);

// ...

```
More see [test](https://github.com/lkspc/node-arcface/blob/master/test/index.js).

## License

MIT