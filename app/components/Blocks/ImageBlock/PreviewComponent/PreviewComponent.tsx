import {useEffect, useState} from 'react';
import {PageBlockInstance} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import styles from './styles.module.css';

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
    <div className={styles.container}>
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
  );
}

export default PreviewComponent;
