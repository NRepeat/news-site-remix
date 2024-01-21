import {Active, DragOverlay, useDndMonitor} from '@dnd-kit/core';
import {useState} from 'react';

import {
  BlocksType,
  PageBlockInstance,
  PageBlocks,
} from '../PageConstructorBlocks/PageConstructorBlocks';
import styles from './styles.module.css';
import {ConstructorSidebarButtonDraggableOverlay} from '../Admin/Sidebar/ConstructorSidebarButton/ConstructorSidebarButton';
import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
const DragOverlayWrapper = ({page}: {page: SerializeFrom<Page>}) => {
  let elements: PageBlockInstance[] = [];
  if (page.content) elements = JSON.parse(page.content);
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
          <ConstructorElement page={page.slug} elementInstance={element} />
        </div>
      );
    }
  }
  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
