import React from 'react';
import styles from './styles.module.css';
const Label = ({children}: {children: React.ReactNode}) => {
  return <p className={styles.label}>{children}</p>;
};

export default Label;
