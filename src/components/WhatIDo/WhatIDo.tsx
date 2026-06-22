import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useStore } from '../../stores/RootStore';
import styles from './WhatIDo.module.css';

export const WhatIDo = observer(() => {
  const ref = useRef<HTMLElement>(null);
  const { contentStore, uiStore } = useStore();
  const progress = useScrollProgress(ref);
  const translate = progress * -400;
  const activeIndex = Math.min(
    contentStore.services.length - 1,
    Math.max(0, Math.round(progress * (contentStore.services.length - 1))),
  );

  useIntersectionObserver({
    id: 'what-i-do',
    theme: 'white',
    ref,
    onEnter: (id, theme) => {
      uiStore.setSection(id);
      uiStore.setTheme(theme);
    },
  });

  return (
    <section id="what-i-do" ref={ref} className={styles.wrap}>
      <div className={styles.sticky}>
        <header className={styles.header}>
          <p className="eyebrow">What I Do</p>
          <h2 className={`section-title reveal ${styles.title}`}>
            <span>Engineering for systems that need to work.</span>
          </h2>
        </header>
        <ul className={styles.rail} style={{ transform: `translate3d(${translate}vw, 0, 0)` }}>
          {contentStore.services.map((service, index) => (
            <li
              className={`${styles.panel} ${index === activeIndex ? styles.activePanel : ''}`}
              key={service.title}
            >
              <div className={styles.number}>{service.number}</div>
              <div className={styles.copy}>
                <h3>{service.title}</h3>
                <p className="body-large">{service.copy}</p>
                <ul className="tagList">
                  {service.tags.map((tag) => (
                    <li className="tag accentTag" key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
