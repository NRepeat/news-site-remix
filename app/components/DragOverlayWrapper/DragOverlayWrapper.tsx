import {Active, DragOverlay, useDndMonitor} from '@dnd-kit/core';
import {useState} from 'react';
import {ConstructorSideBarButtonDraggableOverlay} from '../ConstructorSideBar/Button/Button';
import {
  BlocksType,
  PageBlocks,
} from '../PageConstructorBlocks/PageConstructorBlocks';

const DragOverlayWrapper = () => {
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
  if (isSidebarButtonElement) {
    const type = draggedElement.data?.current?.type as BlocksType;
    node = (
      <ConstructorSideBarButtonDraggableOverlay pageBlock={PageBlocks[type]} />
    );
  }
  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
