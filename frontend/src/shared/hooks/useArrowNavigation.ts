import { RefObject, useCallback, useEffect, useState } from 'react';

const useArrowNavigation = (refs: RefObject<any>[]) => {
  const [focusableElementIndex, setFocusableElementIndex] = useState(0);

  const changeFocusByKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!refs.every((ref) => !!ref.current)) return;
      console.log(refs[0]);

      if (event.key === 'ArrowUp') {
        const nextIndex =
          focusableElementIndex === 0
            ? refs.length - 1
            : focusableElementIndex - 1;

        refs[nextIndex].current.focus();

        setFocusableElementIndex(nextIndex);
      }

      if (event.key === 'ArrowDown') {
        const nextIndex =
          focusableElementIndex === refs.length - 1
            ? 0
            : focusableElementIndex + 1;

        refs[nextIndex].current.focus();

        setFocusableElementIndex(nextIndex);
      }
    },
    [focusableElementIndex, refs],
  );

  const changeFocusByClick = (event: MouseEvent) => {
    if (!event.target) return;

    const clickedIndex = refs.findIndex(
      (ref) => ref.current.id === (event.target as any).id,
    );

    if (clickedIndex !== -1) {
      setFocusableElementIndex(clickedIndex);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', changeFocusByKeyDown);
    window.addEventListener('click', changeFocusByClick);

    return () => {
      window.removeEventListener('keydown', changeFocusByKeyDown);
      window.removeEventListener('click', changeFocusByClick);
    };
  }, [refs]);
};

export { useArrowNavigation };
