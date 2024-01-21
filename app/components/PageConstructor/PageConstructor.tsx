import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Constructor from '../Constructor/Constructor';
import DragOverlayWrapper from '../DragOverlayWrapper/DragOverlayWrapper';
import PreviewPageButton from './PreviewPageButton/PreviewPageButton';
import SavePageButton from './SavePageButton/SavePageButton';
import styles from './styles.module.css';
import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';

const PageConstructor = ({page}: {page: SerializeFrom<Page>}) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensors}>
      <div className={styles.main}>
        <nav className={styles.pageNameContainer}>
          <h2 className={styles.pageName}>
            <span>Page:{page?.name}</span>
          </h2>
          <div className={styles.btnContainer}>
            <PreviewPageButton />
            <SavePageButton page={page!.slug} />
          </div>
        </nav>
        <Constructor page={page} />
      </div>
      <DragOverlayWrapper page={page} />
    </DndContext>
  );
};

export default PageConstructor;
