import {CiTextAlignLeft} from 'react-icons/ci';
import {
  BlocksType,
  PageBlock,
  PageBlockInstance,
} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import styles from './styles.module.css';
import ContentEditableForm from '~/components/ContentEditableForm/ContentEditableForm';

export type TextBlockInstanceType = PageBlockInstance & {
  additionalProperties: typeof additionalProperties;
};

const type: BlocksType = 'TextBlock';

const additionalProperties = {
  label: 'Text Block',
  required: false,
  placeHolder: 'Text',
  content: '',
};

export const TextBlock: PageBlock = {
  type,

  construct: ({id}) => ({
    id,
    type,
    additionalProperties,
  }),
  constructorSideBarButton: {
    icon: CiTextAlignLeft,
    label: 'Text ',
  },
  constructorComponent: ConstructorComponent,
  previewComponent: PreviewComponent,
  propertiesComponent: PropertiesComponent,
};

function PreviewComponent({
  elementInstance,
}: {
  elementInstance: PageBlockInstance;
}) {
  let content = '<div>Not found</div>';
  if (elementInstance.additionalProperties?.content) {
    content = JSON.parse(
      elementInstance.additionalProperties?.content as string
    );
  }
  return <div dangerouslySetInnerHTML={{__html: content}} />;
}

function ConstructorComponent({
  elementInstance,
}: {
  elementInstance: PageBlockInstance;
}) {
  let content = '<div>Not found</div>';
  if (elementInstance.additionalProperties?.content) {
    content = JSON.parse(
      elementInstance.additionalProperties?.content as string
    );
  }
  return <div dangerouslySetInnerHTML={{__html: content}} />;
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: PageBlockInstance;
}) {
  return (
    <div className={styles.propertiesContainer}>
      <div className={styles.textEditorWrapper}>
        <ContentEditableForm elementInstance={elementInstance} />
      </div>
      <button>Delete</button>
    </div>
  );
}
