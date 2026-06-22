import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useStore } from '../../stores/RootStore';
import styles from './Skills.module.css';

export const Skills = observer(() => {
  const ref = useRef<HTMLElement>(null);
  const { contentStore, uiStore } = useStore();

  useIntersectionObserver({
    id: 'skills',
    theme: 'black',
    ref,
    onEnter: (id, theme) => {
      uiStore.setSection(id);
      uiStore.setTheme(theme);
    },
  });

  return (
    <section id="skills" ref={ref} className="section themeBlack">
      <div className="sectionInner">
        <p className="eyebrow">Skills</p>
        <h2 className="section-title reveal">
          <span>Tools for building, shipping, and securing systems.</span>
        </h2>
        <div className={`grid ${styles.grid}`}>
          {contentStore.skills.map((group) => (
            <article className={styles.group} key={group.group}>
              <h3>{group.group}</h3>
              <ul className="tagList">
                {group.skills.map((skill) => (
                  <li className="tag accentTag" key={skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});
