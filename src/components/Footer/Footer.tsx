import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useStore } from '../../stores/RootStore';
import styles from './Footer.module.css';

export const Footer = observer(() => {
  const ref = useRef<HTMLElement>(null);
  const { uiStore } = useStore();

  useIntersectionObserver({
    id: 'contact',
    theme: 'black',
    ref,
    onEnter: (id, theme) => {
      uiStore.setSection(id);
      uiStore.setTheme(theme);
    },
  });

  return (
    <footer id="contact" ref={ref} className={`section themeBlack ${styles.footer}`}>
      <div className="sectionInner grid">
        <div className={styles.title}>
          <p className="eyebrow">Contact</p>
          <h2 className="section-title reveal">
            <span>Build something useful with Clark.</span>
          </h2>
        </div>
        <div className={styles.links}>
          <a className="btn" href="mailto:clark.cruz07@gmail.com">
            Email <ArrowUpRight size={18} />
          </a>
          <a className="btn" href="https://www.linkedin.com/in/ctc07/" target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight size={18} />
          </a>
          <a className="btn" href="https://github.com/clarkcruz07" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={18} />
          </a>
          <a className="btn" href="https://shorturl.at/RBLp4" target="_blank" rel="noreferrer">
            Portfolio <ArrowUpRight size={18} />
          </a>
        </div>
        <p className={styles.copyright}>Copyright 2026 Clark Terence Cruz</p>
      </div>
      <a className={`btn ${styles.top}`} href="#hero" aria-label="Back to top">
        <ArrowUp size={22} />
      </a>
    </footer>
  );
});
