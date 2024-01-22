import { BsFillFileImageFill } from 'react-icons/bs';
import {
  BlocksType,
  PageBlock,
  PageBlockInstance,
} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import ConstructorComponent from './ConstructorComponent/ConstructorComponent';
import PreviewComponent from './PreviewComponent/PreviewComponent';
import PropertiesComponent from './PropertiesComponent/PropertiesComponent';

export type TextBlockInstanceType = PageBlockInstance & {
  additionalProperties: typeof additionalProperties;
};

const type: BlocksType = 'SliderBlock';

const additionalProperties = {
  label: 'Slider Block',
  required: false,
  content: "",
};
export const SliderBlock: PageBlock = {
  type,

  construct: ({ id }) => ({
    id,
    type,
    additionalProperties,
  }),
  constructorSideBarButton: {
    icon: BsFillFileImageFill,
    label: 'Slider ',
  },
  constructorComponent: ConstructorComponent,
  previewComponent: PreviewComponent,
  propertiesComponent: PropertiesComponent,
};




