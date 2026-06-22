import { ArrowUpRight } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { CSSProperties } from 'react';
import { useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useStore } from '../../stores/RootStore';
import styles from './Projects.module.css';

export const Projects = observer(() => {
  const ref = useRef<HTMLElement>(null);
  const { contentStore, uiStore } = useStore();

  useIntersectionObserver({
    id: 'work',
    theme: 'black',
    ref,
    onEnter: (id, theme) => {
      uiStore.setSection(id);
      uiStore.setTheme(theme);
    },
  });

  return (
    <section id="work" ref={ref} className={styles.projects}>
      <div className={styles.intro}>
        <div className={`${styles.introInner} grid`}>
          <div style={{ gridColumn: '1 / -1' }}>
            <p className="eyebrow">Selected Work</p>
            <h2 className="section-title reveal">
              <span>Production-minded AI, IoT, and platform builds.</span>
            </h2>
          </div>
        </div>
      </div>
      <a className={`btn ${styles.github}`} href="https://github.com/clarkcruz07" target="_blank" rel="noreferrer">
        GitHub Profile <ArrowUpRight size={18} />
      </a>
      {contentStore.projects.map((project, index) => (
        <article
          className={styles.card}
          key={project.title}
          style={{ '--project-index': index } as CSSProperties}
        >
          <div className={`${styles.cardInner} grid`}>
            <div className={styles.index}>{String(index + 1).padStart(2, '0')}</div>
            <div className={styles.body}>
              <h3>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>
              <ul className="tagList">
                {project.tags.map((tag) => (
                  <li className="tag accentTag" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
              <p>
                <a className="btn" href={project.link} target="_blank" rel="noreferrer">
                  Open Project <ArrowUpRight size={18} />
                </a>
              </p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
});
