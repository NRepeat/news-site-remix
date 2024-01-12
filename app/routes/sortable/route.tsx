import {
  DndContext,
  DragEndEvent,
  closestCenter,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {useState} from 'react';
import styles from '../../styles.module.css';
import {Panel, PanelGroup, PanelResizeHandle} from 'react-resizable-panels';
export default function Index() {
  const [elementArr, setElementArr] = useState<{id: number; element: string}[]>(
    [
      {id: 1, element: 'test11'},
      {id: 3, element: 'test12'},
      {id: 2, element: 'test13'},
    ]
  );

  const onDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    if (over) {
      if (active.id === over.id) {
        return;
      }
      setElementArr(elements => {
        const oldIndex = elements.findIndex(
          element => element.id === active.id
        );
        const newIndex = elements.findIndex(element => element.id === over.id);

        const updatedElements = [...elements];
        const [draggedElement] = updatedElements.splice(oldIndex, 1);
        updatedElements.splice(newIndex, 0, draggedElement);

        return updatedElements;
      });
    }
  };

  const SortedElement = ({element, id}: {id: number; element: string}) => {
    const {attributes, listeners, setNodeRef, transform, transition} =
      useSortable({id});
    attributes['aria-describedby'] = element;
    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={styles.tab}
        {...attributes}
        {...listeners}
      >
        {element}
      </div>
    );
  };
  const {setNodeRef} = useDroppable({
    id: 1,
  });
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div
        ref={setNodeRef}
        style={{
          padding: '24px',
          border: '1px solid',
          borderColor: '$catskillWhite',
          borderRadius: '$2xl',
        }}
      >
        <SortableContext
          items={elementArr}
          strategy={horizontalListSortingStrategy}
        >
          <PanelGroup direction={'horizontal'} style={{overflow: 'initial'}}>
            {elementArr.map((element, index) => (
              <>
                <Panel
                  key={element.id}
                  style={{overflow: 'initial', minWidth: 100, minHeight: 10}}
                >
                  {' '}
                  <SortedElement
                    key={element.id}
                    element={element.element}
                    id={element.id}
                  />
                </Panel>
                {index !== elementArr.length - 1 && (
                  <PanelResizeHandle>
                    <div
                      style={{
                        width: '10px',
                        height: '20px',
                        background: '$catskillWhite',
                        borderRadius: '$round',
                      }}
                    />
                  </PanelResizeHandle>
                )}
              </>
            ))}
          </PanelGroup>
        </SortableContext>
      </div>
    </DndContext>
  );
}
