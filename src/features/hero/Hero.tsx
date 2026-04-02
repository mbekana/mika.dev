"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import { ArrowRight, Terminal } from 'lucide-react';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
          <br />
          Senior Software Engineer.
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
            Read Architecture Docs
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};
