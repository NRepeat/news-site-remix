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

const Constructor = () => {
  const {addElement, elements} = useConstructor();

  const droppable = useDroppable({
    id: 'constructor-droppable-area',
    data: {isDroppableArea: true},
  });
  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const {active, over} = event;
      if (!active || !over) return null;
      const isConstructorButtonElement =
        active.data?.current?.isConstructorButtonElement;
      if (isConstructorButtonElement) {
        const type = active?.data?.current?.type as BlocksType;
        const newElement = PageBlocks[type].construct({id: createRandomId()});
        addElement({index: 0, element: newElement});
        return newElement;
      }
      return null;
    },
  });
  return (
    <div className={clsx(styles.container)}>
      <div className={styles.wrapper}>
        <div
          ref={droppable.setNodeRef}
          className={clsx(styles.editor, {
            [styles.dropOverlay]: droppable.isOver,
          })}
        >
          {!droppable.isOver && elements && elements.length === 0 && (
            <p className={styles.dropText}>Drop here</p>
          )}

          {droppable.isOver && (
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
