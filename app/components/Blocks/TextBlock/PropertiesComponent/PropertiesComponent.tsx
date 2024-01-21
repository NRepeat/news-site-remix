import {PageBlockInstance} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import styles from './styles.module.css';
import TextEditor from '~/components/TextEditors/TextEditor';

const PropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: PageBlockInstance;
}) => {
  return (
    <div className={styles.container}>
      <b>Test</b>
      <TextEditor element={elementInstance} />
    </div>
  );
};

export default PropertiesComponent;
