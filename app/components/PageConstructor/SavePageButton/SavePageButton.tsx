import {Button} from '~/ui/Button/Button';
import styles from './styles.module.css';
const SavePageButton = ({page}: {page: string}) => {
  console.log('🚀 ~ SavePageButton ~  page:', page);
  const handleSavePage = () => {
    window.localStorage.clear();
    // submit(
    //   {stringifyElements: stringifyElements},
    //   {action: `/${page}/constructor`, method: 'PUT'}
    // );
  };
  return (
    <Button className={styles.button} onClick={handleSavePage}>
      <span>Save page</span>
    </Button>
  );
};

export default SavePageButton;
