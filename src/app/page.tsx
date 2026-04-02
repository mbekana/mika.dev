import { Hero } from '@/features/hero/Hero';
import { About } from '@/features/about/About';
import { CaseStudiesList } from '@/features/case-studies/CaseStudiesList';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>mika.dev</div>
        <nav className={styles.nav}>
          <a href="#case-studies" className={styles.navLink}>Case Studies</a>
          <a href="#architecture" className={styles.navLink}>Architecture</a>
        </nav>
      </header>

      <main className={styles.main}>
        <Hero />
        <About />
        <CaseStudiesList />
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Mika. Senior Frontend Engineer.</p>
      </footer>
    </div>
  );
}
