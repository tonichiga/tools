import { useEffect, useState } from "react";

const useZoom = (coeffProps, newCoeff, showLog) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [scale, setScale] = useState(1);

  const resolutions = {
    width: [
      800, 1024, 1152, 1176, 1280, 1360, 1366, 1400, 1440, 1600, 1680, 1792,
      1856, 1920, 2048, 2560, 3840, 2560, 2880, 3440, 3834, 3840,
    ],
    height: [
      600, 664, 720, 768, 800, 864, 900, 960, 1024, 1050, 1080, 1200, 1050,
      1344, 1392, 1080, 1440, 1152, 1536, 2160, 1600, 2131,
    ],
  };

  let coeff = {
    "800x600": 1.5,
    "800x720": 1.6,
    "800x768": 1.6,
    "800x800": 1.6,
    "800x864": 1.6,
    "800x900": 1.6,
    "800x960": 1.6,
    "800x1024": 1.6,
    "800x1050": 1.6,
    "800x1200": 1.6,
    "800x1344": 1.6,
    "1024x600": 1.4,
    "1024x768": 1.6,
    "1024x720": 1.5,
    "1024x800": 1.5,
    "1024x864": 1.5,
    "1024x900": 1.6,
    "1024x960": 1.6,
    "1024x1024": 1.6,
    "1024x1050": 1.6,
    "1024x1344": 1.6,
    "1152x600": 1.2,
    "1152x720": 1.4,
    "1152x768": 1.5,
    "1152x800": 1.5,
    "1152x864": 1.5,
    "1152x960": 1.5,
    "1152x1024": 1.5,
    "1152x900": 1.5,
    "1152x1050": 1.5,
    "1152x1200": 1.5,
    "1152x1344": 1.5,
    "1176x664": 1.3,
    "1176x864": 1.5,
    "1280x600": 1,
    "1280x720": 1.25,
    "1280x768": 1.4,
    "1280x800": 1.4,
    "1280x864": 1.4,
    "1280x900": 1.4,
    "1280x960": 1.6,
    "1280x1024": 1.6,
    "1366x768": 1.2,
    "1360x768": 1.2,
    "1400x1050": 1.5,
    "1440x864": 1.3,
    "1440x900": 1.4,
    "1440x960": 1.4,
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
    "2560x1536": 1,
    "2560x1600": 1,
    "3840x2160": 1.2,
    "2560x1080": 0.9,
    "2560x1344": 1,
    "2880x1200": 0.85,
    "3840x1344": 0.8,
    "3834x2131": 0.8,
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

  elementStyle.zoom = result;

  return elementStyle;
};

export default useZoom;
