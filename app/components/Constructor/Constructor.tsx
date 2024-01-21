import {useDndMonitor, useDroppable} from '@dnd-kit/core';
import clsx from 'clsx';
import ConstructorElementWrapper from '../ConstructorElementWrapper/ConstructorElementWrapper';
import {PageBlockInstance} from '../PageConstructorBlocks/PageConstructorBlocks';
import styles from './styles.module.css';
import {FC} from 'react';
import Sidebar from '../Admin/Sidebar/Sidebar';
import {useSubmit} from '@remix-run/react';
import {SerializeFrom} from '@remix-run/node';
import {Page} from '@prisma/client';
import {onDragEndHandler} from './Handlers/onDragEnd';

type ConstructorProps = {
  page: SerializeFrom<Page>;
};

const Constructor: FC<ConstructorProps> = ({page}) => {
  let content;
  let elements: PageBlockInstance[] = [];
  if (page?.content) content = JSON.parse(page.content);
  if (content) elements = content;
  const sub = useSubmit();

  const addElement = ({
    index,
    newElement,
  }: {
    index: number;
    newElement: PageBlockInstance;
  }) => {
    const type = 'addElement';
    const serializedNewElement = JSON.stringify(newElement);
    sub(
      {index, newElement: serializedNewElement, type},
      {
        action: `/admin/${page?.slug}/constructor`,
        method: 'POST',
        navigate: false,
      }
    );
  };
  const removeElement = ({id}: {id: string}) => {
    const type = 'removeElement';
    sub(
      {id, type},
      {
        action: `/admin/${page?.slug}/constructor`,
        method: 'POST',
        navigate: false,
      }
    );
  };

  const droppable = useDroppable({
    id: 'constructor-droppable-area',
    data: {isConstructorDroppableArea: true},
  });
  useDndMonitor({
    onDragEnd: e =>
      onDragEndHandler({event: e, addElement, elements, removeElement}),
  });
  return (
    <div>
      <Sidebar type="constructor" />

      <div>
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
              <div className={styles.zone} />
            </div>
          )}
          {elements &&
            elements.length > 0 &&
            elements.map(el => (
              <ConstructorElementWrapper
                page={page.slug}
                key={el.id}
                element={el}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Constructor;
