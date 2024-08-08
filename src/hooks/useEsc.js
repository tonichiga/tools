import { useEffect } from "react";

const useEsc = (onClose) => {
  const handlePressEsc = (e) => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handlePressEsc);
    // eslint-disable-next-line
    return () => {
      window.removeEventListener("keydown", handlePressEsc);
    };
  }, []);
};

export default useEsc;
