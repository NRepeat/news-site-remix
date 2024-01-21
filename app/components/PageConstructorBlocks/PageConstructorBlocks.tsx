import React from 'react';
import {IconType} from 'react-icons';
import {TextBlock} from '../Blocks/TextBlock/TextBlock';
import {ImageBlock} from '../Blocks/ImageBlock/ImageBlock';
import {SliderBlock} from '../Blocks/SliderBlock/SliderBlock';

export type BlocksType = 'TextBlock' | 'ImageBlock' | 'SliderBlock';
export type PageBlockInstance = {
  id: string;
  type: BlocksType;
  additionalProperties?: Record<string, string | number | boolean | string[]>;
};
export type PageBlock = {
  type: BlocksType;
  construct: ({id}: {id: string}) => PageBlockInstance;
  constructorSideBarButton: {
    icon: IconType;
    label: string;
  };
  constructorComponent: React.FC<{
    elementInstance: PageBlockInstance;
    page: string;
  }>;
  previewComponent: React.FC<{elementInstance: PageBlockInstance}>;
  propertiesComponent: React.FC<{elementInstance: PageBlockInstance}>;
};

export type PageBlocksType = {
  [key in BlocksType]: PageBlock;
};

export const PageBlocks: PageBlocksType = {
  TextBlock: TextBlock,
  ImageBlock: ImageBlock,
  SliderBlock: SliderBlock,
};
