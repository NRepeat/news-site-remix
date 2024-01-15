import {
  PageBlockInstance,
  PageBlocks,
} from '../PageConstructorBlocks/PageConstructorBlocks';

const ConstructorElementWrapper = ({element}: {element: PageBlockInstance}) => {
  const ConstructorElement = PageBlocks[element.type].constructorComponent;
  return <ConstructorElement elementInstance={element} />;
};

export default ConstructorElementWrapper;
