import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {Link, useSubmit} from '@remix-run/react';
import {PageBlockInstance} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import {Button} from '~/ui/Button/Button';
import {removeElement} from '~/utils/removeElement';
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
  const sub = useSubmit();

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.wrapper}>
          <p className={styles.blockName}>
            {elementInstance.additionalProperties?.label}
          </p>
          <Link
            className={styles.link}
            prefetch="intent"
            reloadDocument={true}
            to={`/admin/${page?.slug}/constructor/${elementInstance.id}/edit`}
          >
            Edit
          </Link>
        </div>
        <Button
          className={styles.deleteButton}
          onClick={() =>
            removeElement({sub, slug: page?.slug, id: elementInstance.id})
          }
        >
          {' '}
          Delete
        </Button>
      </div>

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
