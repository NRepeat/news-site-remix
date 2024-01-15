import clsx from 'clsx';
import React from 'react';

import type {ButtonHTMLAttributes, DetailedHTMLProps, FC} from 'react';
import styles from './styles.module.css';

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  className?: string;
}

export const Button: FC<ButtonProps> = ({children, className, ...props}) => (
  <button className={clsx(styles.button, className)} {...props}>
    {children}
  </button>
);
