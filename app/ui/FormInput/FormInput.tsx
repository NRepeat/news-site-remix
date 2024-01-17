import {useField} from 'remix-validated-form';
import styles from './styles.module.css';
import {Input} from '../Input/Input';
type MyInputProps = {
  name: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  value?: number | string | undefined;
};

export const FormInput = ({
  name,
  label,
  type,
  placeholder,
  value,
}: MyInputProps) => {
  const {error, getInputProps} = useField(name);

  return (
    <div className={styles.input}>
      <div className={styles.container}>
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
        <Input
          {...getInputProps({value, type, id: name, placeholder, min: '0'})}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
