import {
  BlocksType,
  PageBlock,
  PageBlockInstance,
} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import styles from './styles.module.css';
import {BsFillFileImageFill} from 'react-icons/bs';
import {useEffect, useState} from 'react';
import {Page} from '@prisma/client';
import {Link} from '@remix-run/react';
import {SerializeFrom} from '@remix-run/node';
import Dropzone from './Dropzone';
export type TextBlockInstanceType = PageBlockInstance & {
  additionalProperties: typeof additionalProperties;
};

const type: BlocksType = 'ImageBlock';
type ImageBlockContentType = {
  filepath: string;
  type: string;
  name: string;
};
const additionalProperties = {
  label: 'Image Block',
  required: false,
  alt: 'Image',
  path: '',
  content: '',
  align: 'center',
  width: '100%',
  height: 'auto',
  caption: 'Image Caption',
};
export const ImageBlock: PageBlock = {
  type,

  construct: ({id}) => ({
    id,
    type,
    additionalProperties,
  }),
  constructorSideBarButton: {
    icon: BsFillFileImageFill,
    label: 'Image ',
  },
  constructorComponent: ConstructorComponent,
  previewComponent: PreviewComponent,
  propertiesComponent: PropertiesComponent,
};

function PreviewComponent({
  elementInstance,
}: {
  elementInstance: PageBlockInstance;
}) {
  const [images, setImages] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const i = await fetch(
          `/uploads/${elementInstance.additionalProperties?.path}`
        );

        setImages(i.url);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading image', error);
        setIsLoading(false);
      }
    };

    if (elementInstance.additionalProperties?.path) {
      loadImage();
    } else {
      setIsLoading(false);
    }
  }, [elementInstance.additionalProperties?.path]);

  return (
    <div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div
            style={{
              justifyContent: `${elementInstance.additionalProperties?.align}`,
            }}
            className={styles.previewImageContainer}
          >
            <img
              style={{
                maxHeight: `${elementInstance.additionalProperties?.height}`,
                maxWidth: `${elementInstance.additionalProperties?.width}`,
              }}
              src={images}
              alt="asd"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PreviewComponent;

function ConstructorComponent({
  elementInstance,
  page,
}: {
  page?: SerializeFrom<Page>;
  elementInstance: PageBlockInstance;
}) {
  const content = JSON.parse(
    elementInstance.additionalProperties?.content as string
  ) as ImageBlockContentType[];

  return (
    <>
      {elementInstance.additionalProperties?.label}
      {content.map((img, index) => (
        <img
          key={index}
          style={{maxWidth: '150px'}}
          src={`/uploads/${img.name}`}
          alt="asd"
        />
      ))}

      <Link
        prefetch="intent"
        reloadDocument={true}
        to={`/admin/${page?.slug}/constructor/${elementInstance.id}/edit`}
      >
        Edit
      </Link>
    </>
  );
}

function PropertiesComponent({
  elementInstance,
  page,
}: {
  elementInstance: PageBlockInstance;
  page?: SerializeFrom<Page>;
}) {
  const [images, setImages] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const i = await fetch(
          `/uploads/${elementInstance.additionalProperties?.path}`
        );

        setImages(i.url);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading image', error);
        setIsLoading(false);
      }
    };

    if (elementInstance.additionalProperties?.path) {
      loadImage();
    } else {
      setIsLoading(false);
    }
  }, [elementInstance.additionalProperties?.path]);
  return (
    <div className={styles.propertiesContainer}>
      <Dropzone element={elementInstance} page={page} />
      <div>
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <img
              style={{maxHeight: `150px`, maxWidth: `150px`}}
              src={images}
              alt="asd"
            />
          )}
        </div>
      </div>
      <button>Delete</button>
    </div>
  );
}
