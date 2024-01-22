import { Link, useSubmit } from '@remix-run/react';
import { FC } from 'react';
import { PageBlockInstance } from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import { removeElement } from '~/utils/removeElement';
import { Button } from '../Button/Button';
import styles from './styles.module.css';

type ConstructorElementEditBar = {
	elementInstance: PageBlockInstance
	slug?: string,
	opacity: boolean
}
const ConstructorElementEditBar: FC<ConstructorElementEditBar> = ({ elementInstance, slug, opacity }) => {
	const sub = useSubmit()
	return (
		<div style={{ opacity: opacity ? "100" : '0' }} className={styles.head}>
			<div className={styles.wrapper}>
				<p className={styles.blockName}>
					{elementInstance.additionalProperties?.label}
				</p>
				<Link
					className={styles.link}
					prefetch="intent"
					reloadDocument={true}
					to={`/admin/${slug}/constructor/${elementInstance.id}/edit`}
				>
					Edit
				</Link>
			</div>
			<Button
				className={styles.deleteButton}
				onClick={() =>
					removeElement({ sub, slug, id: elementInstance.id })
				}
			>
				Delete
			</Button>
		</div>
	)
}

export default ConstructorElementEditBar