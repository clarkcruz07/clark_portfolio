import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useStore } from '../../stores/RootStore';
import styles from './Experience.module.css';

export const Experience = observer(() => {
  const ref = useRef<HTMLElement>(null);
  const { contentStore, uiStore } = useStore();

  useIntersectionObserver({
    id: 'experience',
    theme: 'white',
    ref,
    onEnter: (id, theme) => {
      uiStore.setSection(id);
      uiStore.setTheme(theme);
    },
  });

  return (
    <section id="experience" ref={ref} className="section themeWhite">
      <div className="sectionInner">
        <p className="eyebrow">Experience</p>
        <h2 className="section-title reveal">
          <span>Ten years across product, platform, and operations.</span>
        </h2>
        <div className={styles.timeline}>
          {contentStore.experience.map((item) => (
            <article className={styles.item} key={`${item.company}-${item.period}`}>
              <div className={styles.period}>{item.period}</div>
              <h3 className={styles.company}>{item.company}</h3>
              <p className={styles.role}>{item.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});
