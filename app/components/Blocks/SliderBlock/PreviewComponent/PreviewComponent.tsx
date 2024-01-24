import { PageBlockInstance } from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import { ImageBlockContentType } from '../../ImageBlock/ImageBlock';
import CustomSlider, { Slide } from '../Slider/Slider';
function PreviewComponent({
  elementInstance,
}: {
  elementInstance: PageBlockInstance;
}) {
  const content = elementInstance.additionalProperties?.content
    ? (JSON.parse(
      elementInstance.additionalProperties?.content as string
    ) as ImageBlockContentType[])
    : '';

  return (



    <CustomSlider >
      {Array.isArray(content) &&
        content.map(img => <Slide key={img.filepath} img={img.name} />)}
    </CustomSlider>
  );
}

export default PreviewComponent;
