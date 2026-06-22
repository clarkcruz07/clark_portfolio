import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useStore } from '../../stores/RootStore';
import styles from './Loader.module.css';

export const Loader = observer(() => {
  const { uiStore } = useStore();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setCount(100);
      uiStore.completeLoader();
      return;
    }

    document.body.classList.add('no-scroll');
    const timer = window.setInterval(() => {
      setCount((value) => {
        const next = Math.min(100, value + Math.ceil(Math.random() * 8));
        if (next >= 100) {
          window.clearInterval(timer);
          window.setTimeout(() => {
            uiStore.completeLoader();
            document.body.classList.remove('no-scroll');
          }, 350);
        }
        return next;
      });
    }, 80);

    return () => {
      window.clearInterval(timer);
      document.body.classList.remove('no-scroll');
    };
  }, [uiStore]);

  return (
    <div className={`${styles.loader} ${uiStore.loaderComplete ? styles.done : ''}`}>
      <div className={styles.counter}>{count}%</div>
    </div>
  );
});
