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
import {useEffect} from 'react';
import useConstructor from '~/hooks/useConstructor';
import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';

const PageConstructor = ({page}: {page: SerializeFrom<Page> | null}) => {
  const {setElement} = useConstructor();
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

  useEffect(() => {
    if (!page) throw new Error('Bad request');
    if (window.localStorage.getItem('content')) {
      const el = window.localStorage.getItem('content');
      if (el) {
        const els = JSON.parse(el);
        setElement(els);
        return;
      }
    }
    if (!page.content) {
      setElement([]);
      return;
    }

    const elements = JSON.parse(page.content);
    setElement(elements);
  }, [page, setElement]);

  return (
    <DndContext sensors={sensors}>
      <main className={styles.main}>
        <nav className={styles.pageNameContainer}>
          <h2 className={styles.pageName}>
            <span>Page:{page?.name}</span>
          </h2>
          <div className={styles.btnContainer}>
            <PreviewPageButton />
            <SavePageButton page={page!.slug} />
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
