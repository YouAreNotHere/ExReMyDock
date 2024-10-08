import { useEffect } from 'react';

const useButtonFocus = () => {
  // const func = (event: any, key: string, elem: any) => {
  //   if (event.key === key) {
  //     if (elem) {
  //       event.preventDefault();
  //       elem.focus();
  //     }
  //   }
  // };
  const func: any = (ref: any, action: any, key: any) => {
    useEffect(() => {
      if (!ref) return;
      function handleScroll(event: any) {
        action();
      }
      ref.addEventListener('keydown', handleScroll);
      return () => ref.removeEventListener('keydown', handleScroll);
    }, []);
  };

  return func;
};

export default useButtonFocus;
