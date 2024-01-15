import {DndContext} from '@dnd-kit/core';
import Constructor from '../Constructor/Constructor';
import DragOverlayWrapper from '../DragOverlayWrapper/DragOverlayWrapper';
import PreviewPageButton from './PreviewPageButton/PreviewPageButton';
import SavePageButton from './SavePageButton/SavePageButton';
import styles from './styles.module.css';
const PageConstructor = () => {
  return (
    <DndContext>
      <main className={styles.main}>
        <nav className={styles.pageNameContainer}>
          <h2 className={styles.pageName}>
            <span>Page:</span>Page
          </h2>
          <div className={styles.btnContainer}>
            <PreviewPageButton />
            <SavePageButton />
          </div>
        </nav>
        <div className={styles.constructorArea}>
          <Constructor />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default PageConstructor;
