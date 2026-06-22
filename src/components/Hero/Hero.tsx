import { ArrowUpRight } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useStore } from '../../stores/RootStore';
import styles from './Hero.module.css';

export const Hero = observer(() => {
  const ref = useRef<HTMLElement>(null);
  const { uiStore } = useStore();

  useIntersectionObserver({
    id: 'hero',
    theme: 'black',
    ref,
    onEnter: (id, theme) => {
      uiStore.setSection(id);
      uiStore.setTheme(theme);
    },
  });

  return (
    <section id="hero" ref={ref} className={`section pinSection themeBlack ${styles.hero}`}>
      <div className="sectionInner grid">
        <div className={styles.content}>
          <h1 className="display reveal">
            <span>Clark Terence Cruz</span>
          </h1>
          <p className={styles.sub}>Senior Full-Stack & AI Engineer</p>
          <span className={styles.badge}>
            Taiwan Employment Gold Card Holder - Open Work Permit, No Employer Sponsorship Required
          </span>
        </div>
        <p className={`body-large ${styles.oneLine}`}>
          10+ years building distributed systems, LLM-powered workflows, IoT platforms, and cloud microservices.
        </p>
        <div className={styles.actions}>
          <a className="btn" href="#work">
            View Work <ArrowUpRight size={18} />
          </a>
          <a className="btn" href="mailto:clark.cruz07@gmail.com">
            Let's Talk <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
});
