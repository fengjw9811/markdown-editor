import {useState, useEffect} from 'react';

const useKeyPress = (targetKeyCode) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const keyDownHandler = (e) => {
    const {keyCode} = e;
    if (keyCode === targetKeyCode) {
      setKeyPressed(true);
    }
  };

  const keyUpHandler = (e) => {
    const {keyCode} = e;
    if (keyCode === targetKeyCode) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, []);

  return keyPressed;
};

export default useKeyPress;
