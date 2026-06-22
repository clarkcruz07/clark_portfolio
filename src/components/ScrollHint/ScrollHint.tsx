import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import styles from './ScrollHint.module.css';

export const ScrollHint = observer(() => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hide = () => setHidden(true);
    window.addEventListener('scroll', hide, { passive: true, once: true });
    return () => window.removeEventListener('scroll', hide);
  }, []);

  return <div className={`${styles.hint} ${hidden ? styles.hidden : ''}`}>Scroll to explore</div>;
});
