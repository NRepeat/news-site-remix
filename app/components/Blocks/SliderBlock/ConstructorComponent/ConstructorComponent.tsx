import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {PageBlockInstance} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import useOpacity from '~/hooks/useOpacity';
import ConstructorElementEditBar from '~/ui/ConstructorElementEditBar/ConstructorElementEditBar';
import {ImageBlockContentType} from '../../ImageBlock/ImageBlock';
import CustomSlider, {Slide} from '../Slider/Slider';
import styles from './styles.module.css';

export default function ConstructorComponent({
  elementInstance,
  page,
}: {
  page?: SerializeFrom<Page>;
  elementInstance: PageBlockInstance;
}) {
  const {opacity, setOpacity} = useOpacity();
  const content = elementInstance.additionalProperties?.content
    ? (JSON.parse(
        elementInstance.additionalProperties?.content as string
      ) as ImageBlockContentType[])
    : '';

  return (
    <div
      onMouseEnter={() => setOpacity(true)}
      onMouseLeave={() => setOpacity(false)}
      className={styles.container}
    >
      {elementInstance.additionalProperties?.label}
      <ConstructorElementEditBar
        opacity={opacity}
        elementInstance={elementInstance}
        slug={page?.slug}
      />

      <CustomSlider>
        {Array.isArray(content) &&
          content.map(img => <Slide key={img.filepath} img={img.name} />)}
      </CustomSlider>
    </div>
  );
}
