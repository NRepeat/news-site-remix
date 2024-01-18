import {DragEndEvent, useDndMonitor, useDroppable} from '@dnd-kit/core';
import clsx from 'clsx';
import useConstructor from '~/hooks/useConstructor';
import {createRandomId} from '~/utils/randomId';
import ConstructorElementWrapper from '../ConstructorElementWrapper/ConstructorElementWrapper';
import ConstructorSideBar from '../ConstructorSideBar/ConstructorSideBar';
import {
  BlocksType,
  PageBlocks,
} from '../PageConstructorBlocks/PageConstructorBlocks';
import styles from './styles.module.css';
import {useEffect} from 'react';

const Constructor = () => {
  const {addElement, elements, setSelectedElement, removeElement} =
    useConstructor();

  if (!elements) throw new Error('Element not found');
  useEffect(() => {
    if (Array.isArray(elements) && elements.length === 0) {
      setSelectedElement(null);
    }
  }, [elements, setSelectedElement]);
  const droppable = useDroppable({
    id: 'constructor-droppable-area',
    data: {isConstructorDroppableArea: true},
  });
  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const {active, over} = event;
      if (!active || !over) return null;
      const isConstructorButtonElement =
        active.data?.current?.isConstructorButtonElement;
      const isDroppingOverConstructorDropArea =
        over.data.current?.isConstructorDroppableArea;
      const isDroppingOverConstructorElementTop =
        over.data.current?.isTopHalfDroppable;
      const isDroppingOverConstructorElementBottom =
        over.data.current?.isBottomHalfDroppable;

      const isDroppingOverConstructorElement =
        isDroppingOverConstructorElementTop ||
        isDroppingOverConstructorElementBottom;
      const droppingOverConstructorElement =
        isConstructorButtonElement && isDroppingOverConstructorElement;
      const isDraggingConstructorElement =
        active.data.current?.isConstructorElement;

      const draggingConstructorElementOverAnotherConstructorElement =
        isDroppingOverConstructorElement && isDraggingConstructorElement;

      if (isConstructorButtonElement && isDroppingOverConstructorDropArea) {
        const type = active?.data?.current?.type as BlocksType;
        const newElement = PageBlocks[type].construct({id: createRandomId()});
        addElement({index: elements.length, element: newElement});
        return newElement;
      }

      if (droppingOverConstructorElement) {
        const type = active?.data?.current?.type as BlocksType;
        const newElement = PageBlocks[type].construct({id: createRandomId()});
        const overId = over.data.current?.elementId;
        const overElementIndex = elements.findIndex(el => el.id === overId);
        if (overElementIndex === -1) throw new Error('Element not found');

        let index = overElementIndex;

        if (isDroppingOverConstructorElementBottom) {
          index = overElementIndex + 1;
        }
        if (overElementIndex === 0) {
          index = Math.max(0, index - 1);
        }
        addElement({index, element: newElement});
      }
      if (draggingConstructorElementOverAnotherConstructorElement) {
        const activeId = active.data.current?.elementId;
        const overId = over.data.current?.elementId;
        const overElementIndex = elements.findIndex(el => el.id === overId);

        const activeIndex = elements.findIndex(el => el.id === activeId);
        const overIndex = elements.findIndex(el => el.id === overId);
        if (activeIndex === -1 || overIndex === -1)
          throw new Error('not found');
        const activeElement = {...elements[activeIndex]};
        removeElement({id: activeId});
        let index = overElementIndex;

        if (isDroppingOverConstructorElementBottom) {
          index = overElementIndex + 1;
        }
        addElement({index, element: activeElement});
      }
      return null;
    },
  });
  return (
    <div className={clsx(styles.container)}>
      <div aria-hidden="true" className={styles.wrapper}>
        <div
          ref={droppable.setNodeRef}
          className={clsx(styles.editor, {
            [styles.dropOverlay]: droppable.isOver,
          })}
        >
          {!droppable.isOver && elements && elements.length === 0 && (
            <p className={styles.dropText}>Drop here</p>
          )}

          {droppable.isOver && elements && elements.length === 0 && (
            <div className={styles.dropZone}>
              <div className={styles.zone}></div>
            </div>
          )}
          {elements &&
            elements.length > 0 &&
            elements.map(element => (
              <ConstructorElementWrapper key={element.id} element={element} />
            ))}
        </div>
      </div>
      <ConstructorSideBar />
    </div>
  );
};

export default Constructor;
