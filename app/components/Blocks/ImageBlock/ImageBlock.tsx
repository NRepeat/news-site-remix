import {
  BlocksType,
  PageBlock,
  PageBlockInstance,
} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import styles from './styles.module.css';
import {BsFillFileImageFill} from 'react-icons/bs';
import {Form} from '@remix-run/react';
import {useContext, useEffect, useState} from 'react';
import {PageConstructorContext} from '~/context/ConstructorContext/ConstructorContext';
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

function MyDropzone({elementInstance}: {elementInstance: PageBlockInstance}) {
  const context = useContext(PageConstructorContext);
  if (!context) throw new Error('Not found');
  const {updateElement, elements} = context;
  const [imageProperties, setImageProperties] = useState({
    align: 'center',
    width: '100%',
    height: 'auto',
    caption: 'Image Caption',
  });

  useEffect(() => {
    if (elements) {
      const el = JSON.stringify(elements);
      window.localStorage.setItem('content', el);
    }
  }, [elements]);
  const handleAlignChange = (newAlign: string) => {
    setImageProperties(prevProperties => ({
      ...prevProperties,
      align: newAlign,
    }));
  };

  const handleWidthChange = (newWidth: string) => {
    setImageProperties(prevProperties => ({
      ...prevProperties,
      width: newWidth,
    }));
  };

  const handleHeightChange = (newHeight: string) => {
    setImageProperties(prevProperties => ({
      ...prevProperties,
      height: newHeight,
    }));
  };

  const handleCaptionChange = (newCaption: string) => {
    setImageProperties(prevProperties => ({
      ...prevProperties,
      caption: newCaption,
    }));
  };
  const handleSave = (e?: React.ChangeEvent<HTMLInputElement>) => {
    const fileName = e?.target.value.slice(
      e.target.value.lastIndexOf('\\') + 1
    );

    const updatedElement = {
      ...elementInstance,
      additionalProperties: {
        ...elementInstance.additionalProperties,
        path: fileName ? fileName : elementInstance.additionalProperties!.path,

        align: imageProperties.align,
        width: imageProperties.width,
        height: imageProperties.height,
        caption: imageProperties.caption,
      },
    };

    updateElement({id: updatedElement.id, element: updatedElement});
  };
  return (
    <>
      <Form
        method="post"
        action="/main/constructor/upload"
        encType="multipart/form-data"
      >
        <label>
          Select file:{' '}
          <input type="file" name="file" onChange={e => handleSave(e)} />
        </label>
        <button type="submit">Upload</button>
      </Form>
      <div>
        <h2>Image Controls</h2>
        <label>
          Align:
          <select
            value={imageProperties.align}
            onChange={e => handleAlignChange(e.target.value)}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </label>
        <br />
        <label>
          Width:
          <input
            type="text"
            value={imageProperties.width}
            onChange={e => handleWidthChange(e.target.value)}
          />
        </label>
        <br />
        <label>
          Height:
          <input
            type="text"
            value={imageProperties.height}
            onChange={e => handleHeightChange(e.target.value)}
          />
        </label>
        <br />
        <label>
          Caption:
          <input
            type="text"
            value={imageProperties.caption}
            onChange={e => handleCaptionChange(e.target.value)}
          />
        </label>
        <br />

        <button onClick={() => handleSave()}>Save</button>
      </div>
    </>
  );
}

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
      <img
        src={`~/uploads/${elementInstance.additionalProperties?.path}`}
        alt="asd"
      />
    </>
  );
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: PageBlockInstance;
}) {
  console.log('🚀 ~  elementInstance:', elementInstance);

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
      <MyDropzone elementInstance={elementInstance} />
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
