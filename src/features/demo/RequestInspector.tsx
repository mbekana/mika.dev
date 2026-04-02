"use client";

import React, { useState, useEffect } from 'react';
import styles from './RequestInspector.module.css';
import { clsx } from 'clsx';
import { Activity, Webhook, WifiOff, FileJson } from 'lucide-react';

interface RequestInspectorProps {
  domain: string;
}

type LogType = 'ws' | 'api' | 'error';

interface Log {
  id: string;
  timestamp: string;
  type: LogType;
  method?: string;
  path?: string;
  status?: number;
  payload: string;
  latency?: number;
}

export const RequestInspector: React.FC<RequestInspectorProps> = ({ domain }) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let timeout: NodeJS.Timeout;
    let count = 0;

    const generateLog = () => {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;
      
      let newLog: Log;

      if (domain === 'realtime-dashboard') {
        const isError = Math.random() > 0.95;
        newLog = {
          id: `req-${count}`,
          timestamp: timeStr,
          type: isError ? 'error' : 'ws',
          payload: isError 
            ? '{"error": "WS_DROP", "reason": "Connection reset by peer"}'
            : `{"event": "TX_UPDATE", "txId": "tx_${Math.floor(Math.random() * 90000) + 10000}", "status": "FLAGGED"}`,
        };
      } else {
        // Identity verification
        const sequence = count % 4;
        const methods = ['POST', 'PUT', 'GET', 'POST'];
        const paths = ['/v1/session', '/v1/upload/frame', '/v1/liveness/status', '/v1/kyc/submit'];
        const statuses = [201, 200, 200, Math.random() > 0.8 ? 503 : 202];
        const latencies = [120, 890, 45, Math.random() > 0.8 ? 5000 : 340]; // Notice the 890ms upload

        newLog = {
          id: `req-${count}`,
          timestamp: timeStr,
          type: statuses[sequence] >= 400 ? 'error' : 'api',
          method: methods[sequence],
          path: paths[sequence],
          status: statuses[sequence],
          latency: latencies[sequence],
          payload: statuses[sequence] >= 400 
            ? '{"code": "NETWORK_ERROR", "retryable": true}' 
            : '{"status": "success"}',
        };
      }

      setLogs(curr => [newLog, ...curr].slice(0, 50));
      count++;
      
      timeout = setTimeout(generateLog, domain === 'realtime-dashboard' ? (Math.random() * 300) + 50 : 1500);
    };

    timeout = setTimeout(generateLog, 500);
    return () => clearTimeout(timeout);
  }, [domain, isPaused]);

  return (
    <div className={styles.inspector}>
      <div className={styles.header}>
        <div className={styles.tabBar}>
          <div className={clsx(styles.tab, styles.activeTab)}>
            <Activity size={14} /> Network Log
          </div>
          <div className={styles.tab}>
            <FileJson size={14} /> State Tree
          </div>
        </div>
        <div className={styles.controls}>
          <button 
            className={clsx(styles.btn, isPaused && styles.btnActive)} 
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button className={styles.btn} onClick={() => setLogs([])}>Clear</button>
        </div>
      </div>
      
      <div className={styles.logContainer}>
        {logs.map(log => (
          <div key={log.id} className={clsx(styles.logEntry, log.type === 'error' && styles.logError)}>
            <div className={styles.logMeta}>
              <span className={styles.timestamp}>{log.timestamp}</span>
              {log.type === 'ws' && <span className={styles.method}><Webhook size={12} className={styles.inlineIcon} /> WS</span>}
              {log.type === 'api' && <span className={clsx(styles.method, styles[log.method?.toLowerCase() || ''])}>{log.method}</span>}
              {log.type === 'error' && <span className={styles.method}><WifiOff size={12} className={styles.inlineIcon} /> ERR</span>}
              
              {log.path && <span className={styles.path}>{log.path}</span>}
              {log.status && <span className={clsx(styles.status, log.status >= 400 ? styles.statusError : styles.statusOk)}>{log.status}</span>}
              {log.latency && <span className={styles.latency}>{log.latency}ms</span>}
            </div>
            <div className={styles.payload}>
              {log.payload}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
