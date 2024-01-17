import {PageBlockInstance} from '../PageConstructorBlocks/PageConstructorBlocks';
import PreviewPageElement from '../PreviewPageElement/PreviewPageElement';
import styles from './styles.module.css';

const PreviewPage = ({pageContent}: {pageContent: PageBlockInstance[]}) => {
  return (
    <div className={styles.container}>
      {pageContent.map(el => (
        <div key={el.id} className={styles.wrapper}>
          <PreviewPageElement element={el} />
        </div>
      ))}
    </div>
  );
};

export default PreviewPage;
