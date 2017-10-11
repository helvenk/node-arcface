/*
 * @Author: lkspc 
 * @Date: 2017-10-10 00:04:20 
 * @Last Modified by: lkspc
 * @Last Modified time: 2017-10-11 16:06:45
 */

const path = require('path');
const FaceSDK = require('../lib');

const face = new FaceSDK();

(async function() {
  try {
    // initial
    face.initialFDEngine(path.join(__dirname, './libarcsoft_fsdk_face_detection.dll'), {
      appId: "6ZYMpYb2yAQk8J6YoY45hCeQcLV9ggzgaG2qWkYGbEwH",
      sdkKey: "8NBp6g1xda114ahtKKMrkRXikBhPmTn2tw4WQQDUk2TL",
      maxFace: 10
    });
    face.initialFREngine(path.join(__dirname, './libarcsoft_fsdk_face_recognition.dll'), {
      appId: '6ZYMpYb2yAQk8J6YoY45hCeQcLV9ggzgaG2qWkYGbEwH',
      sdkKey: '8NBp6g1xda114ahtKKMrkRYDPnk5FY54ZvwY3ThHzQ8k'
    });

    // parse image file
    const asvl1 = await face.parseImage(path.join(__dirname, './img/faceA.jpg'));
    const asvl2 = await face.parseImage(path.join(__dirname, './img/faceB.jpg'));

    // face detection
    const faces1 = face.detect(asvl1);
    if (faces1.nFace === 0) {
      throw Error('no face detected');
    }

    const faces2 = face.detect(asvl2);
    if (faces2.nFace === 0) {
      throw Error('no face detected');
    }

    console.log(faces1)
    console.log(faces2)

    // extract face featrue
    const faceModel1 = face.extractFeature(asvl1, faces1.rcFace[0], faces1.lfaceOrient[0])
    const faceModel2 = face.extractFeature(asvl2, faces2.rcFace[0], faces2.lfaceOrient[0]);

    // comparing
    const similarity = face.compare(faceModel1, faceModel2);
    console.log(similarity)

    // uninitial
    face.uninitial();
  } catch (err) {
    console.error(err);
  }
})();