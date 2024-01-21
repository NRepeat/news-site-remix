import {PageBlocks} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import ConstructorSidebarButton from '../ConstructorSidebarButton/ConstructorSidebarButton';

const ConstructorSideBarBlocs = () => {
  return (
    <div>
      {' '}
      <ConstructorSidebarButton pageBlock={PageBlocks.ImageBlock} />
      <ConstructorSidebarButton pageBlock={PageBlocks.TextBlock} />
      <ConstructorSidebarButton pageBlock={PageBlocks.SliderBlock} />
    </div>
  );
};

export default ConstructorSideBarBlocs;
