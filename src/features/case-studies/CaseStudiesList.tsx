import React from 'react';
import { caseStudies } from '@/content/case-studies';
import { Card } from '@/components/Card/Card';
import { Badge } from '@/components/Badge/Badge';
import { ArrowRight, BarChart2 } from 'lucide-react';
import styles from './CaseStudiesList.module.css';
import Link from 'next/link';
import { ImagePreview } from './ImagePreview';

export const CaseStudiesList = () => {
  return (
    <section className={styles.section} id="case-studies">
      <div className={styles.header}>
        <h2 className={styles.title}>Selected Work</h2>
        <div className={styles.line} />
      </div>

      <div className={styles.list}>
        {caseStudies.map((study) => (
          <Card key={study.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{study.title}</h3>
              <div className={styles.tags}>
                {study.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>

            {study.imageUrl && (
              <ImagePreview
                src={study.imageUrl}
                alt={`${study.title} UI`}
                urlLabel={study.url ?? `${study.id}.internal.app`}
              />
            )}

            <div className={styles.content}>
              <div className={styles.column}>
                <h4 className={styles.label}>Context</h4>
                <p className={styles.text}>{study.context}</p>
                <div className={styles.spacing} />
                <h4 className={styles.label}>The Decision</h4>
                <p className={styles.text}>{study.decision}</p>
              </div>

              <div className={styles.metricsColumn}>
                <h4 className={styles.label}>
                  <BarChart2 size={14} className={styles.icon} />
                  Measured Outcomes
                </h4>
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
                <div className={styles.actions}>
                  <Link href={`/case-studies/${study.id}`} className={styles.readLink}>
                    Read Full Detail
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
