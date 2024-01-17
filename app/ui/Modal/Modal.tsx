import React from 'react';
import styles from './styles.module.css';
const Modal = ({children}: {children: React.ReactNode}) => {
  return <div className={styles.container}>{children}</div>;
};

export default Modal;
