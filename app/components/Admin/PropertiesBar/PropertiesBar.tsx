import {
  PageBlockInstance,
  PageBlocks,
} from '~/components/PageConstructorBlocks/PageConstructorBlocks';

const PropertiesBar = ({element}: {element: PageBlockInstance}) => {
  const PropertiesBlock = PageBlocks[element.type].propertiesComponent;

  return <PropertiesBlock elementInstance={element} />;
};

export default PropertiesBar;
