import useConstructor from '~/hooks/useConstructor';
import {PageBlocks} from '../PageConstructorBlocks/PageConstructorBlocks';

const SidebarElementsProperties = () => {
  const {selectedElement} = useConstructor();
  if (!selectedElement) throw new Error('Element not found');
  const PropertiesBlock = PageBlocks[selectedElement.type].propertiesComponent;

  return <PropertiesBlock elementInstance={selectedElement} />;
};

export default SidebarElementsProperties;
