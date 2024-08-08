const submitOnEnter = () => {
  const handleKeyDown = (e, func, object) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      func(object);
    }
  };

  return handleKeyDown;
};

export default submitOnEnter;
