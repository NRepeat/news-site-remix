import {FC} from 'react';
import styles from './styles.module.css';
import ConstructorSideBarBlocs from './ConstructorSidebarBlocs/ConstructorSidebarBlocs';

type SidebarType = {
  type: 'constructor';
};

const Sidebar: FC<SidebarType> = ({type}) => {
  return (
    <nav className={styles.container}>
      {type === 'constructor' && <ConstructorSideBarBlocs />}
    </nav>
  );
};

export default Sidebar;
