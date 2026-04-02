"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Terminal, Mail, Users, Code, Check, Copy } from 'lucide-react';
import Link from 'next/link';
import styles from './Hero.module.css';

export const Hero = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('milkias.bekana29@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className={styles.badgeWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <span className={styles.statusBadge}>
            <span className={styles.pulse}></span>
            Building for Enat Bank & Upwork Clients
          </span>
        </motion.div>

        <h1 className={styles.title}>
          <span className={styles.name}>Milkias Bekana</span>
          <span>Senior Software Engineer.</span>
        </h1>

        <p className={styles.subtitle}>
          I design the systems behind the interfaces, from WebSocket reconciliation to token-driven design systems.
        </p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <a href="#case-studies" className={styles.btnPrimary}>
            View Case Studies
            <ArrowRight size={16} />
          </a>
          <Link href="/architecture" className={styles.btnSecondary}>
            <Terminal size={16} />
            Architecture Hub
          </Link>
        </motion.div>

        {/* Quick Connect Hub */}
        <motion.div
          className={styles.connectWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className={styles.connectMenu}>
            <button
              className={styles.connectBtn}
              onClick={copyEmail}
              title="Copy Email"
            >
              {copied ? <Check size={18} style={{ color: '#10b981' }} /> : <Mail size={18} />}
              <AnimatePresence>
                {copied && (
                  <motion.span
                    className={styles.copyLabel}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                  >
                    Email Copied
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
            <a href="https://linkedin.com/in/milkias-bekana" target="_blank" rel="noopener noreferrer" className={styles.connectBtn} title="LinkedIn">
              <Users size={18} />
            </a>
            <a href="https://github.com/mbekana" target="_blank" rel="noopener noreferrer" className={styles.connectBtn} title="GitHub">
              <Code size={18} />
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.portraitWrapper}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <Image
          src="/images/dev-mb.jpg"
          alt="Milkias Bekana"
          fill
          className={styles.portrait}
          priority
        />
        <div className={styles.portraitOverlay} />
      </motion.div>
    </section>
  );
};
