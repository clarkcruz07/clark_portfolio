import { RefObject, useEffect, useState } from 'react';

export function useScrollProgress(ref?: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = ref?.current;

    const update = () => {
      if (target) {
        const rect = target.getBoundingClientRect();
        const distance = Math.max(1, rect.height - window.innerHeight);
        const next = Math.min(1, Math.max(0, -rect.top / distance));
        setProgress(next);
        return;
      }

      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, window.scrollY / scrollable)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ref]);

  return progress;
}
