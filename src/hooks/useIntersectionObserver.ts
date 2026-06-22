import { RefObject, useEffect } from 'react';

type Options = {
  id: string;
  theme: 'black' | 'white';
  ref: RefObject<HTMLElement | null>;
  onEnter: (id: string, theme: 'black' | 'white') => void;
};

export function useIntersectionObserver({ id, theme, ref, onEnter }: Options) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onEnter(id, theme);
        }
      },
      { root: null, rootMargin: '-34% 0px -50% 0px', threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [id, onEnter, ref, theme]);
}
