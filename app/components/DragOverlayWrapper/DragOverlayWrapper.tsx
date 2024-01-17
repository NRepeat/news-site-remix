import {Active, DragOverlay, useDndMonitor} from '@dnd-kit/core';
import {useState} from 'react';
import {ConstructorSidebarButtonDraggableOverlay} from '../ConstructorSideBar/Button/Button';
import {
  BlocksType,
  PageBlocks,
} from '../PageConstructorBlocks/PageConstructorBlocks';
import useConstructor from '~/hooks/useConstructor';
import styles from './styles.module.css';
const DragOverlayWrapper = () => {
  const {elements} = useConstructor();
  const [draggedElement, setDraggedElement] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: event => {
      setDraggedElement(event.active);
    },
    onDragCancel: () => {
      setDraggedElement(null);
    },
    onDragEnd: () => {
      setDraggedElement(null);
    },
  });
  if (!draggedElement) return null;
  const isSidebarButtonElement =
    draggedElement.data?.current?.isConstructorButtonElement;
  let node;
  let type;
  if (isSidebarButtonElement) {
    type = draggedElement.data?.current?.type as BlocksType;
    node = (
      <ConstructorSidebarButtonDraggableOverlay pageBlock={PageBlocks[type]} />
    );
  }
  const isConstructorElement =
    draggedElement.data?.current?.isConstructorElement;
  if (isConstructorElement) {
    const elementId = draggedElement?.data?.current?.elementId;
    const element = elements?.find(el => el.id === elementId);
    if (!element) node = <div>Element not found</div>;
    else {
      const ConstructorElement = PageBlocks[element.type].constructorComponent;
      node = (
        <div className={styles.constructorElementWrapper}>
          <ConstructorElement editorMode={false} elementInstance={element} />
        </div>
      );
    }
  }
  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
