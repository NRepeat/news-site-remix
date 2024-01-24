import { SerializeFrom } from '@remix-run/node';
import clsx from 'clsx';
import { PostWithTags } from '~/service/post.server';
import { Button } from '~/ui/Button/Button';
import styles from './styles.module.css';


type NewsToolBarType = {
	handleSubmit: () => void
	post: SerializeFrom<PostWithTags>;
	handlePreviewMode: () => void
	opacity: boolean
}
const NewsToolBar = ({ handleSubmit, post, handlePreviewMode, opacity }: NewsToolBarType) => {
	return (
		<div className={styles.container}>
			<p className={styles.title}>  <span>Title:</span> {post.title}</p>

			<div className={styles.btnWrapper}>
				<Button style={{ display: `${opacity ? "none" : "block"}` }} className={clsx(styles.edit)}>
					Edit news card
				</Button>
				<Button style={{ display: `${opacity ? "none" : "block"}` }} className={styles.save} onClick={() => handleSubmit()}>Save news</Button>
				<Button className={styles.save} onClick={() => handlePreviewMode()}>
					Preview mode
				</Button>

			</div>

		</div>
	)
}

export default NewsToolBar