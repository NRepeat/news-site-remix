import useConstructor from '~/hooks/useConstructor';
import {PageBlocks} from '../PageConstructorBlocks/PageConstructorBlocks';
import ConstructorSideBarButton from './Button/Button';
import styles from './styles.module.css';
import SidebarElementsProperties from '../SidebarElementsProperties/SidebarElementsProperties';

const ConstructorSideBar = () => {
  const {selectedElement} = useConstructor();
  return (
    <aside className={styles.sideBar}>
      {!selectedElement && (
        <>
          <ConstructorSideBarButton pageBlock={PageBlocks.ImageBlock} />
          <ConstructorSideBarButton pageBlock={PageBlocks.TextBlock} />
        </>
      )}
      {selectedElement && <SidebarElementsProperties />}
    </aside>
  );
};

export default ConstructorSideBar;
