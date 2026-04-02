import React from 'react';
import Link from 'next/link';
import { ArrowLeft, GitBranch, Layers, ShieldCheck, Zap, Shield, Activity, Terminal } from 'lucide-react';
import { Badge } from '@/components/Badge/Badge';
import styles from './page.module.css';

export default function ArchitectureHub() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.maxWidth}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Hub
          </Link>
          <h1 className={styles.pageTitle}>Engineering Architecture & Standards</h1>
          <p className={styles.pageSubtitle}>
            A living document detailing the system design principles, stack constraints, and organizational patterns I enforce in production environments.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          {/* Section: Global System Design */}
          <section className={styles.section}>
            <div className={styles.sectionIcon}><Layers /></div>
            <h2 className={styles.sectionTitle}>Global System Design</h2>
            <div className={styles.content}>
              <p className={styles.text}>
                I favor a decoupled orchestration architecture that isolates volatile UI logic from stable core business rules.
              </p>

              <div className={styles.diagramContainer}>
                <div className={styles.diagramRow}>
                  <div className={`${styles.node} ${styles.nodeAccent}`}>Client (Next/Nuxt)</div>
                  <div className={styles.connector}><div className={styles.arrowHead} /></div>
                  <div className={styles.node}>API Gateway</div>
                </div>
                <div className={styles.connectorVer} />
                <div className={styles.diagramRow}>
                  <div className={styles.node}>Auth Service</div>
                  <div className={styles.node}>Orchestrator</div>
                  <div className={styles.node}>Worker (Node/Go)</div>
                </div>
                <div className={styles.connectorVer} />
                <div className={styles.diagramRow}>
                  <div className={styles.node}>Primary DB (PostgreSQL)</div>
                  <div className={styles.connector}><div className={styles.arrowHead} /></div>
                  <div className={styles.node}>Cache (Redis)</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Stack Decision Framework */}
          <section className={styles.section}>
            <div className={styles.sectionIcon}><Terminal /></div>
            <h2 className={styles.sectionTitle}>Stack Decision Framework</h2>
            <div className={styles.content}>
              <p className={styles.text}>
                Tools should serve the product constraint, not resume hype. My default stack hierarchy:
              </p>
              <ul className={styles.list}>
                <li><strong>Next.js / Nuxt.js:</strong> Chosen for SEO-dependent, public-facing applications requiring Edge rendering or ISR (e.g., e-commerce, content portals).</li>
                <li><strong>Node.js (Fastify/NestJS):</strong> The default for high-performance microservices and orchestration layers requiring high I/O throughput.</li>
                <li><strong>React + Vite:</strong> For high-interactivity, authenticated SPAs where framework overhead is zero value.</li>
                <li><strong>Vanilla CSS Modules:</strong> Enforced for enterprise design systems to ensure strict, token-driven custom properties.</li>
              </ul>
            </div>
          </section>

          {/* Section: Security & Access Control */}
          <section className={styles.section}>
            <div className={styles.sectionIcon}><Shield /></div>
            <h2 className={styles.sectionTitle}>Security & Access Control</h2>
            <div className={styles.content}>
              <p className={styles.text}>
                Security is baked into the transport layer. I enforce a Zero Trust approach between services.
              </p>
              <div className={styles.codeBlock}>
                <code><span className={styles.code_comment}>// Enforced at the Gateway Layer</span></code><br />
                <code><span className={styles.code_keyword}>const</span> <span className={styles.code_type}>securityPolicy</span> = {'{'}</code><br />
                <code className={styles.indent}>auth: <span className={styles.code_string}>'Strict JWT + Refresh Rotation'</span>,</code><br />
                <code className={styles.indent}>csrf: <span className={styles.code_keyword}>true</span>,</code><br />
                <code className={styles.indent}>sanitization: <span className={styles.code_string}>'Automatic Input/Output Encoding'</span></code><br />
                <code>{'}'}</code>
              </div>
            </div>
          </section>

          {/* Section: State Management Hierarchy */}
          <section className={styles.section}>
            <div className={styles.sectionIcon}><GitBranch /></div>
            <h2 className={styles.sectionTitle}>State Management Hierarchy</h2>
            <div className={styles.content}>
              <p className={styles.text}>
                State complexity is minimized by keeping logic as closely as possible to the consumer.
              </p>
              <div className={styles.codeBlock}>
                <code><span className={styles.code_keyword}>URL State</span> <span className={styles.code_comment}>(Search, Filters, Tabs) -&gt; Shareable</span></code><br />
                <code><span className={styles.code_keyword}>Server State</span> <span className={styles.code_comment}>(React Query / SWR) -&gt; Cached & Async</span></code><br />
                <code><span className={styles.code_keyword}>Global UI State</span> <span className={styles.code_comment}>(Zustand) -&gt; App Context</span></code><br />
                <code><span className={styles.code_keyword}>Local State</span> <span className={styles.code_comment}>(useState) -&gt; Ephemeral</span></code>
              </div>
            </div>
          </section>

          {/* Section: Performance Budgets */}
          <section className={styles.section}>
            <div className={styles.sectionIcon}><Zap /></div>
            <h2 className={styles.sectionTitle}>Performance Budgets</h2>
            <div className={styles.content}>
              <p className={styles.text}>
                "The app is fast" is an opinion. These thresholds are facts I maintain across all production builds:
              </p>
              <ul className={styles.list}>
                <li><Badge variant="outline">LCP &lt; 2.5s</Badge> Managed via route-based code splitting and ISR.</li>
                <li><Badge variant="outline">TBT &lt; 200ms</Badge> Maintained by offloading expensive reconciliation to Web Workers.</li>
                <li><Badge variant="outline">CLS &lt; 0.1</Badge> Enforced via strict aspect-ratio containers and skeletal loaders.</li>
              </ul>
            </div>
          </section>

          {/* Section: Observability & Resilience */}
          <section className={styles.section}>
            <div className={styles.sectionIcon}><Activity /></div>
            <h2 className={styles.sectionTitle}>Observability & Resilience</h2>
            <div className={styles.content}>
              <p className={styles.text}>
                A system you can't observe is a system you can't trust. All production apps must implement:
              </p>
              <ul className={styles.list}>
                <li><strong>Error Tracking:</strong> Centralized Sentry integration with source map support for production debugging.</li>
                <li><strong>Tracing:</strong> OpenTelemetry spans across the frontend-to-orchestrator boundary for bottleneck detection.</li>
                <li><strong>Circuit Breaking:</strong> Fail-fast mechanisms in the API Gateway to prevent cascading failures.</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
