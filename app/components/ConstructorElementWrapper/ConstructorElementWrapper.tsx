import {useDraggable, useDroppable} from '@dnd-kit/core';
import {useState} from 'react';
import {FaRegTrashAlt} from 'react-icons/fa';
import useConstructor from '~/hooks/useConstructor';
import {Button} from '~/ui/Button/Button';
import {
  PageBlockInstance,
  PageBlocks,
} from '../PageConstructorBlocks/PageConstructorBlocks';
import styles from './styles.module.css';

const ConstructorElementWrapper = ({element}: {element: PageBlockInstance}) => {
  const draggable = useDraggable({
    id: element.id + 'constructor-element-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isConstructorElement: true,
    },
  });

  const {removeElement} = useConstructor();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
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
  const ConstructorElement = PageBlocks[element.type].constructorComponent;
  return (
    <div
      ref={draggable.setNodeRef}
      className={styles.dropContainer}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      {...draggable.attributes}
      {...draggable.listeners}
    >
      <div ref={droppableTop.setNodeRef} className={styles.topArea} />
      <div ref={droppableBottom.setNodeRef} className={styles.bottomArea} />
      {mouseIsOver && (
        <>
          <div className={styles.delete}>
            <Button
              onClick={() => removeElement({id: element.id})}
              className={styles.deleteButton}
            >
              <FaRegTrashAlt className={styles.deleteIcon} />
            </Button>
          </div>

          <div className={styles.hover}>
            <p className={styles.hoverText}>
              Click for properties or drag ro move
            </p>
          </div>
        </>
      )}
      <div className={styles.wrapper}>
        <ConstructorElement elementInstance={element} />
      </div>
    </div>
  );
};

export default ConstructorElementWrapper;
