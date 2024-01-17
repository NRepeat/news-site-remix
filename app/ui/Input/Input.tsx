import clsx from 'clsx';
import type {DetailedHTMLProps, FC, InputHTMLAttributes} from 'react';
import styles from './styles.module.css';

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
}

export const Input: FC<InputProps> = ({className, ...props}) => (
  <input className={clsx(styles.input, className)} {...props} />
);
