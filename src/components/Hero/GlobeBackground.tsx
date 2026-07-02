import type { CSSProperties } from 'react';
import styles from './Hero.module.css';

type GlobeBackgroundProps = {
  progress: number;
};

export function GlobeBackground({ progress }: GlobeBackgroundProps) {
  const frameScale = 1 + progress * 0.04;
  const style = { '--globe-scale': frameScale } as CSSProperties;

  return (
    <div className={styles.globeCanvas} style={style}>
      <iframe
        title="Standalone globe demo"
        className={styles.globeFrame}
        src="/threeJS/index.html"
        loading="eager"
        aria-hidden="true"
      />
    </div>
  );
}