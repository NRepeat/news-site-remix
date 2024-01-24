import { useField } from 'remix-validated-form';
import { Input } from '../../Input/Input';
import styles from './styles.module.css';
type MyInputProps = {
  name: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  value?: number | string | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement>
};

const FormInput = ({
  name,
  label,
  type,
  placeholder,
  value,
  onChange
}: MyInputProps) => {
  const { error, getInputProps } = useField(name);

  return (
    <div className={styles.input}>
      <div className={styles.container}>
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
        <Input
          {...getInputProps({ onChange, value, type, id: name, placeholder, min: '0' })}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
export default FormInput