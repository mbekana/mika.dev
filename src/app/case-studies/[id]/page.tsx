import React from 'react';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/content/case-studies';
import { Badge } from '@/components/Badge/Badge';
import { Button } from '@/components/Button/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';
import { RequestInspector } from '@/features/demo/RequestInspector';

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const study = caseStudies.find(s => s.id === resolvedParams.id);
  
  if (!study) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Hub
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.tags}>
            {study.tags.map(tag => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
          <h1 className={styles.title}>{study.title}</h1>
        </div>

        <div className={styles.grid}>
          <div className={styles.contentColumn}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>The Constraint</h2>
              <p className={styles.text}>{study.context}</p>
              <p className={styles.text}>{study.problem}</p>
            </section>
            
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>The Decision</h2>
              <p className={styles.text}>{study.decision}</p>
              <p className={styles.text}>
                We chose this architecture because avoiding global state complexity was critical to maintaining a fast iteration speed and avoiding re-renders in heavy list elements.
              </p>
            </section>
            
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>The Result</h2>
              <p className={styles.text}>{study.result}</p>
              <div className={styles.metricsGrid}>
                {study.metrics.map(metric => (
                  <div key={metric.label} className={styles.metricCard}>
                    <div className={styles.metricLabel}>{metric.label}</div>
                    <div className={styles.metricValues}>
                      <span className={styles.before}>{metric.before}</span>
                      <ArrowRight size={10} className={styles.arrow} />
                      <span className={styles.after}>{metric.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          <aside className={styles.demoColumn}>
            {study.id === 'realtime-dashboard' || study.id === 'identity-verification' ? (
              <div className={styles.stickyDemo}>
                <h3 className={styles.demoTitle}>System Simulation</h3>
                <p className={styles.demoDesc}>
                  Live representation of system traffic.
                </p>
                <div className={styles.demoContainer}>
                  <RequestInspector domain={study.id} />
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </main>
    </div>
  );
}
