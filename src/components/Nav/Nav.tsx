import { ArrowUpRight } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import styles from './Nav.module.css';

export const Nav = observer(() => (
  <nav className={styles.nav} aria-label="Primary navigation">
    <a className={styles.brand} href="#hero">
      CTC
    </a>
    <div className={styles.links}>
      <a href="#work">Work</a>
      <a href="#experience">Experience</a>
      <a href="#contact">
        Contact <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </div>
  </nav>
));
