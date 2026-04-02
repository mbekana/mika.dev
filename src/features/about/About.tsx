import React from 'react';
import styles from './About.module.css';

export const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.header}>
        <h2 className={styles.title}>Engineering Philosophy</h2>
        <div className={styles.line} />
      </div>

      <div className={styles.grid}>
        <div className={styles.column}>
          <p className={styles.paragraph}>
            I think about frontend in three layers: what the user experiences, what the system does, and where they diverge.
          </p>
          <p className={styles.paragraph}>
            Most performance bugs are architecture bugs. Most UX problems are state management problems. My job is to find the root cause before fixing the symptom.
          </p>
        </div>
        <div className={styles.column}>
          <p className={styles.paragraph}>
            I've shipped production systems at scale — identity verification platforms, financial operations dashboards, and enterprise design systems. 
          </p>
          <p className={styles.paragraph}>
            I work best in teams that have specific opinions on architecture, performance budgets, and failure handling — and defend them.
          </p>
        </div>
      </div>
    </section>
  );
};
