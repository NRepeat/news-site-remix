import {
  BlocksType,
  PageBlock,
  PageBlockInstance,
} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import styles from './styles.module.css';
import {BsFillFileImageFill} from 'react-icons/bs';
import {useEffect, useState} from 'react';
export type TextBlockInstanceType = PageBlockInstance & {
  additionalProperties: typeof additionalProperties;
};

const type: BlocksType = 'ImageBlock';

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
}: {
  elementInstance: PageBlockInstance;
}) {
  return (
    <>
      {elementInstance.additionalProperties?.label}
      {/* <img
        src={`/uploads/${elementInstance.additionalProperties?.path}`}
        alt="asd"
      /> */}
    </>
  );
}

function PropertiesComponent({
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
    <div className={styles.propertiesContainer}>
      {/* <Dropzone elementInstance={elementInstance} /> */}
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
