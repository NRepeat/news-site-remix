import { useField } from 'remix-validated-form';
import styles from './styles.module.css';
type MyInputProps = {
	name: string;
	label?: string;
	type?: React.HTMLInputTypeAttribute | undefined;
	placeholder?: string;
	value?: number | string | undefined;
};

const FormTextArea = ({
	name,
	label,
	placeholder,
	value,
	onChange: ChangeEventHandler<HTMLTextAreaElement>
}: MyInputProps) => {
	const { error, getInputProps } = useField(name);

	return (
		<div className={styles.input}>
			<div className={styles.container}>
				<label className={styles.label} htmlFor={name}>
					{label}
				</label>
				<textarea
					onChange={ }
					{...getInputProps({ value, id: name, placeholder, })}
				/>
			</div>
			{error && <p className={styles.error}>{error}</p>}
		</div>
	);
};

export default FormTextArea