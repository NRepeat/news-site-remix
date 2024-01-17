import {useDraggable, useDroppable} from '@dnd-kit/core';
import {useContext} from 'react';

import {
  PageBlockInstance,
  PageBlocks,
} from '../PageConstructorBlocks/PageConstructorBlocks';
import styles from './styles.module.css';
import clsx from 'clsx';
import {PageConstructorContext} from '~/context/ConstructorContext/ConstructorContext';

const ConstructorElementWrapper = ({element}: {element: PageBlockInstance}) => {
  const draggable = useDraggable({
    id: element.id + 'constructor-element-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isConstructorElement: true,
    },
  });
  const context = useContext(PageConstructorContext);

  if (!context) {
    throw new Error('Not constructor context');
  }

  const {setSelectedElement, selectedElement} = context;

  const droppableTop = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDroppable: true,
    },
  });
  const droppableBottom = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDroppable: true,
    },
  });
  if (draggable.isDragging) return null;
  const ConstructorElement = PageBlocks[element.type].constructorComponent;

  return (
    <div
      ref={draggable.setNodeRef}
      className={styles.dropContainer}
      {...draggable.attributes}
      {...draggable.listeners}
    >
      {droppableTop.isOver && <div className={styles.topBar} />}
      {droppableBottom.isOver && <div className={styles.bottomBar} />}

      <div
        className={clsx(
          styles.wrapper,
          {[styles.onTopHalf]: droppableTop.isOver},
          {[styles.onBottomHalf]: droppableBottom.isOver}
        )}
      >
        <button
          onClick={() => setSelectedElement(selectedElement ? null : element)}
        >
          Edit
        </button>
        <ConstructorElement
          editorMode={selectedElement ? true : false}
          elementInstance={element}
        />
      </div>
      <div ref={droppableTop.setNodeRef} className={styles.topArea} />
      <div ref={droppableBottom.setNodeRef} className={styles.bottomArea} />
    </div>
  );
};

export default ConstructorElementWrapper;
