import React from 'react';
import styles from './Card.module.css';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, interactive = false }) => {
  return (
    <div className={clsx(styles.card, { [styles.interactive]: interactive }, className)}>
      {children}
    </div>
  );
};
