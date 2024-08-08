import { useState, useEffect } from "react";

const useScale = (coeffProps, newCoeff, showLog) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [scale, setScale] = useState(1);

  const resolutions = {
    width: [
      800, 1024, 1152, 1280, 1366, 1400, 1440, 1600, 1680, 1792, 1856, 1920,
      2048, 2560, 3840, 2560, 2880, 3440, 3840,
    ],
    height: [
      600, 768, 864, 720, 800, 960, 1024, 1050, 900, 1200, 1050, 1344, 1392,
      1080, 1440, 1152, 1536, 2160, 1600,
    ],
  };

  let coeff = {
    "800x600": 1.6,
    "1024x768": 1.6,
    "1024x720": 1.6,
    "1152x768": 1.5,
    "1152x864": 1.5,
    "1280x600": 1,
    "1280x720": 1.25,
    "1280x768": 1.4,
    "1280x800": 1.4,
    "1280x960": 1.6,
    "1280x1024": 1.6,
    "1366x768": 1.2,
    "1400x1050": 1.5,
    "1440x900": 1.4,
    "1600x900": 1.2,
    "1600x1200": 1.4,
    "1680x1050": 1.3,
    "1792x1344": 1.45,
    "1856x1392": 1.4,
    "1920x1080": 1.2,
    "1920x1200": 1.2,
    "1920x1392": 1.4,
    "1920x1440": 1.4,
    "2048x1152": 1.1,
    "2048x1536": 1,
    "2560x1440": 0.9,
    "3840x2160": 1.2,
    "2560x1080": 0.9,
    "2560x1344": 1,
    "2880x1200": 0.85,
    "3840x1344": 0.8,
    "3440x1440": 0.9,
    "3840x1600": 0.8,
    "3840x1536": 0.8,
  };

  const changeCoeffResolution = (coeff, newCoeff) => {
    if (!newCoeff) {
      return coeff;
    }
    return { ...coeff, ...newCoeff };
  };

  coeff = changeCoeffResolution(coeff, newCoeff);

  const sortWidth = resolutions.width.sort(function (a, b) {
    return a - b;
  });
  const sortHeight = resolutions.height.sort(function (a, b) {
    return a - b;
  });

  const adaptiveData = {
    sortWidth,
    sortHeight,
    coeff,
  };

  const elementStyle = {};
  const percentWidth = (windowWidth / 1920) * 100;

  function detectResoluteion({ sortWidth, sortHeight, coeff }) {
    const currentWidth = sortWidth.reduce((prev, curr) =>
      Math.abs(curr - windowWidth) <= Math.abs(prev - windowWidth) ? curr : prev
    );

    const currentHeight = sortHeight.reduce((prev, curr) =>
      Math.abs(curr - windowHeight) <= Math.abs(prev - windowHeight)
        ? curr
        : prev
    );

    if (showLog) {
      console.log({
        currentWidth,
        currentHeight,
        coef: coeff[`${currentWidth}x${currentHeight}`],
      });
    }

    setScale((percentWidth / 100) * coeff[`${currentWidth}x${currentHeight}`]);
  }

  function resize() {
    window.addEventListener("resize", resizeThrottler, false);

    let resizeTimeout;
    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          actualResizeHandler();
        }, 66);
      }
    }

    function actualResizeHandler() {
      setWindowWidth(document.documentElement.clientWidth);
      setWindowHeight(document.documentElement.clientHeight);
    }
  }
  resize();

  useEffect(() => {
    setWindowWidth(document.documentElement.clientWidth);
    setWindowHeight(document.documentElement.clientHeight);
  }, []);

  useEffect(() => {
    setScale((percentWidth / 100) * 1);
    detectResoluteion(adaptiveData);
    // eslint-disable-next-line
  }, [windowHeight, windowWidth]);

  let initialCoef = coeffProps ? coeffProps : 1;
  let result =
    scale.toFixed(1) * initialCoef ? scale.toFixed(1) * initialCoef : 1;

  elementStyle.transform = `scale(${result})`;

  return elementStyle;
};

export default useScale;
