import {CiTextAlignLeft} from 'react-icons/ci';
import {
  BlocksType,
  PageBlock,
  PageBlockInstance,
} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import Label from '~/ui/Label/Label';
import styles from './styles.module.css';

type TextBlockInstanceType = PageBlockInstance & {
  additionalProperties: typeof additionalProperties;
};

const type: BlocksType = 'TextBlock';

const additionalProperties = {
  label: 'Text Block',
  required: false,
  placeHolder: 'Text',
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
  previewComponent: () => <div>TextBlock</div>,
  propertiesComponent: () => <div>TextBlock</div>,
};

function ConstructorComponent({
  elementInstance,
}: {
  elementInstance: PageBlockInstance;
}) {
  const textElement = elementInstance as TextBlockInstanceType;
  const {label, placeHolder} = textElement.additionalProperties;
  return (
    <div className={styles.container}>
      <Label>{label}</Label>
      <textarea className={styles.textarea} placeholder={placeHolder} />
    </div>
  );
}
