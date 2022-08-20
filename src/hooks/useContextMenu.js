import {faVolumeHigh} from '@fortawesome/free-solid-svg-icons';
import {useEffect, useRef} from 'react';
const remote = window.require('@electron/remote');
const {Menu, MenuItem} = remote;

const useContextMenu = (itemArr, targetSelector, deps) => {
  const clickElement = useRef(null);
  useEffect(() => {
    const menu = new Menu();
    itemArr.forEach((item) => {
      menu.append(new MenuItem(item));
    });
    const handleContextMenu = (e) => {
      const targetDom = document.querySelectorAll(targetSelector);
      if (Array.prototype.includes.call(targetDom, e.target)) {
        clickElement.current = e.target;
        menu.popup({window: remote.getCurrentWindow()});
      }
    };
    window.addEventListener('contextmenu', handleContextMenu);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [deps]);
  return clickElement;
};

export default useContextMenu;
