import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

export default function App() {
  const webcamRef = useRef(null);
  const [expression, setExpression] = useState("Loading...");

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    startDetection();
  };

  const startDetection = () => {
    setInterval(async () => {
      if (webcamRef.current?.video) {
        const video = webcamRef.current.video;

        const result = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        if (result) {
          const exp = result.expressions;
          const best = Object.keys(exp).reduce((a, b) =>
            exp[a] > exp[b] ? a : b
          );
          setExpression(best);
        }
      }
    }, 300);
  };

  return (
    <div>
      <h1>Expression: {expression}</h1>
      <Webcam ref={webcamRef} />
    </div>
  );
}