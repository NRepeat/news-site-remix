import { PageBlockInstance } from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import { ImageBlockContentType } from '../ImageBlock';
import styles from './styles.module.css';

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
    <div
      className={styles.container}
    >


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

export default PreviewComponent;
