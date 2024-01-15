import {PageBlocks} from '../PageConstructorBlocks/PageConstructorBlocks';
import ConstructorSideBarButton from './Button/Button';
import styles from './styles.module.css';

const ConstructorSideBar = () => {
  return (
    <aside className={styles.sideBar}>
      <ConstructorSideBarButton pageBlock={PageBlocks.TextBlock} />
    </aside>
  );
};

export default ConstructorSideBar;
