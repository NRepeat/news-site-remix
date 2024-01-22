import { BsFillFileImageFill } from 'react-icons/bs';
import {
  BlocksType,
  PageBlock,
  PageBlockInstance,
} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import PreviewComponent from '../SliderBlock/PreviewComponent/PreviewComponent';
import ConstructorComponent from './ConstructorComponent/ConstructorComponent';
import PropertiesComponent from './PropertiesComponent/PropertiesComponent';
export type TextBlockInstanceType = PageBlockInstance & {
  additionalProperties: typeof additionalProperties;
};

const type: BlocksType = 'ImageBlock';
export type ImageBlockContentType = {
  filepath: string;
  type: string;
  name: string;
};
const additionalProperties = {
  label: 'Image Block',
  required: false,
  alt: 'Image',
  path: '',
  content: '',
  align: 'center',
  width: '100%',
  height: 'auto',
  caption: 'Image Caption',
};
export const ImageBlock: PageBlock = {
  type,

  construct: ({ id }) => ({
    id,
    type,
    additionalProperties,
  }),
  constructorSideBarButton: {
    icon: BsFillFileImageFill,
    label: 'Image ',
  },
  constructorComponent: ConstructorComponent,
  previewComponent: PreviewComponent,
  propertiesComponent: PropertiesComponent,
};
