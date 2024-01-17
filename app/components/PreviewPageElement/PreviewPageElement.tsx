import {
  PageBlockInstance,
  PageBlocks,
} from '../PageConstructorBlocks/PageConstructorBlocks';
const PreviewPageElement = ({element}: {element: PageBlockInstance}) => {
  const PreviewElement = PageBlocks[element.type].previewComponent;
  return <PreviewElement elementInstance={element} />;
};

export default PreviewPageElement;
