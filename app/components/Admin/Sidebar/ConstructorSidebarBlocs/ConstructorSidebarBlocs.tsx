import {PageBlocks} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import ConstructorSidebarButton from '../ConstructorSidebarButton/ConstructorSidebarButton';
import styles from './styles.module.css';
const ConstructorSideBarBlocs = () => {
  return (
    <div className={styles.container}>
      <ConstructorSidebarButton pageBlock={PageBlocks.ImageBlock} />
      <ConstructorSidebarButton pageBlock={PageBlocks.TextBlock} />
      <ConstructorSidebarButton pageBlock={PageBlocks.SliderBlock} />
    </div>
  );
};

export default ConstructorSideBarBlocs;
