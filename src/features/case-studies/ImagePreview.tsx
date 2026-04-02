"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';
import styles from './ImagePreview.module.css';

interface ImagePreviewProps {
  src: string;
  alt: string;
  urlLabel: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt, urlLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to gradient position for a dynamic feel
  const backgroundPositionX = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  // Glowing "approach" effect: starts faint, peaks in viewport center
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0.95, 1, 1, 0.95]);

  const handleClose = useCallback(() => setIsOpen(false), []);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Browser chrome frame (always visible) */}
      <div
        ref={containerRef}
        className={styles.browserFrame}
        role="button"
        tabIndex={0}
        aria-label={`Expand ${alt} fullscreen`}
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(true)}
      >
        <div className={styles.browserBar}>
          <div className={styles.browserDots}>
            <span className={styles.dot} style={{ background: '#ff5f57' }} />
            <span className={styles.dot} style={{ background: '#febc2e' }} />
            <span className={styles.dot} style={{ background: '#28c840' }} />
          </div>
          <div className={styles.browserUrl}>{urlLabel}</div>
          <motion.div
            className={styles.expandHint}
            style={{
              backgroundPositionX,
              opacity,
              scale
            }}
          >
            <Maximize2 size={12} />
            <span>Expand</span>
          </motion.div>
        </div>
        <div className={styles.browserContent}>
          <Image
            src={src}
            alt={alt}
            width={800}
            height={500}
            className={styles.projectImage}
          />
          <div className={styles.fadeOverlay} />
        </div>
      </div>

      {/* Lightbox Portal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label={`${alt} fullscreen view`}
          >
            <motion.div
              className={styles.lightbox}
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Chrome bar inside lightbox */}
              <div className={styles.lightboxBar}>
                <div className={styles.browserDots}>
                  <span className={styles.dot} style={{ background: '#ff5f57' }} />
                  <span className={styles.dot} style={{ background: '#febc2e' }} />
                  <span className={styles.dot} style={{ background: '#28c840' }} />
                </div>
                <div className={styles.lightboxUrl}>{urlLabel}</div>
                <button
                  className={styles.closeBtn}
                  onClick={handleClose}
                  aria-label="Close fullscreen view"
                >
                  <X size={16} />
                </button>
              </div>

              <div className={styles.lightboxImageWrapper}>
                <Image
                  src={src}
                  alt={alt}
                  width={1600}
                  height={1000}
                  className={styles.lightboxImage}
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
