import React from 'react';
import {IconType} from 'react-icons';
import {TextBlock} from '../Blocks/TextBlock/TextBlock';

export type BlocksType = 'TextBlock';
export type PageBlockInstance = {
  id: string;
  type: BlocksType;
  additionalProperties?: Record<string, string | number | boolean>;
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
    editorMode: boolean;
  }>;
  previewComponent: React.FC<{elementInstance: PageBlockInstance}>;
  propertiesComponent: React.FC<{elementInstance: PageBlockInstance}>;
};

export type PageBlocksType = {
  [key in BlocksType]: PageBlock;
};

export const PageBlocks: PageBlocksType = {
  TextBlock: TextBlock,
};
