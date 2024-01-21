import {DragEndEvent} from '@dnd-kit/core';
import {
  BlocksType,
  PageBlockInstance,
  PageBlocks,
} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import {createRandomId} from '~/utils/randomId';

type onDragEndArgs = {
  event: DragEndEvent;
  elements: PageBlockInstance[];
  addElement: ({
    index,
    newElement,
  }: {
    index: number;
    newElement: PageBlockInstance;
  }) => void;
};

export const onDragEndHandler = ({
  event,
  elements,
  addElement,
}: onDragEndArgs) => {
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
    addElement({index: elements.length, newElement});
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
    addElement({index, newElement});
  }
  if (draggingConstructorElementOverAnotherConstructorElement) {
    const activeId = active.data.current?.elementId;
    const overId = over.data.current?.elementId;
    const overElementIndex = elements.findIndex(el => el.id === overId);

    const activeIndex = elements.findIndex(el => el.id === activeId);
    const overIndex = elements.findIndex(el => el.id === overId);
    if (activeIndex === -1 || overIndex === -1) throw new Error('not found');

    const activeElement = {...elements[activeIndex]};
    let index = overElementIndex;
    if (isDroppingOverConstructorElementBottom) {
      index = overElementIndex + 1;
    }
    addElement({index, newElement: activeElement});
  }
  return null;
};
