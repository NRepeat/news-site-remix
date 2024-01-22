import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {PageBlockInstance} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import useOpacity from '~/hooks/useOpacity';
import ConstructorElementEditBar from '~/ui/ConstructorElementEditBar/ConstructorElementEditBar';
import {ImageBlockContentType} from '../ImageBlock';
import styles from './styles.module.css';

export default function ConstructorComponent({
  elementInstance,
  page,
}: {
  page?: SerializeFrom<Page>;
  elementInstance: PageBlockInstance;
}) {
  const content = elementInstance.additionalProperties?.content
    ? (JSON.parse(
        elementInstance.additionalProperties?.content as string
      ) as ImageBlockContentType[])
    : '';

  const {opacity, setOpacity} = useOpacity();
  return (
    <div
      onMouseEnter={() => setOpacity(true)}
      onMouseLeave={() => setOpacity(false)}
      className={styles.container}
    >
      <ConstructorElementEditBar
        opacity={opacity}
        elementInstance={elementInstance}
        slug={page?.slug}
      />

      {content &&
        content.map((img, index) => (
          <img
            key={index}
            className={styles.img}
            src={`/uploads/${img.name}`}
            alt="asd"
          />
        ))}
    </div>
  );
}
