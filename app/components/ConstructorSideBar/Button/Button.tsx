import {useDraggable} from '@dnd-kit/core';
import clsx from 'clsx';
import {PageBlock} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import {Button} from '~/ui/Button/Button';
import styles from './styles.module.css';

const ConstructorSideBarButton = ({pageBlock}: {pageBlock: PageBlock}) => {
  const {icon: Icons, label} = pageBlock.constructorSideBarButton;
  const draggable = useDraggable({
    id: `constructor-sidebar-button-${pageBlock.type}`,
    data: {
      type: pageBlock.type,
      isConstructorButtonElement: true,
    },
  });
  draggable.attributes['aria-describedby'] = pageBlock.type;
  return (
    <button
      ref={draggable.setNodeRef}
      className={clsx(styles.button, {[styles.dragging]: draggable.isDragging})}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icons className={styles.icon} />
      <p className={styles.label}>{label}</p>
    </button>
  );
};
export const ConstructorSidebarButtonDraggableOverlay = ({
  pageBlock,
}: {
  pageBlock: PageBlock;
}) => {
  const {icon: Icons, label} = pageBlock.constructorSideBarButton;

  return (
    <Button className={clsx(styles.button)}>
      <Icons className={styles.icon} />
      <p className={styles.label}>{label}</p>
    </Button>
  );
};

export default ConstructorSideBarButton;
