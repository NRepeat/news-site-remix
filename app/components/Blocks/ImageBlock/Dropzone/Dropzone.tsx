import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {Form, useSubmit} from '@remix-run/react';
import {useState} from 'react';
import {PageBlockInstance} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import styles from './styles.module.css';

export default function Dropzone({
  element,
  page,
}: {
  page?: SerializeFrom<Page>;
  element: PageBlockInstance;
}) {
  const sub = useSubmit();
  const prevContentImg = element.additionalProperties?.content
    ? JSON.parse(element.additionalProperties?.content as string)
    : null;
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files) {
      const newFiles = event.target.files[0];
      const newPreviews = [...imagePreviews];

      const reader = new FileReader();

      reader.onloadend = () => {
        newPreviews[index] = reader.result as string;
        setImagePreviews(newPreviews);
      };

      reader.readAsDataURL(newFiles);

      setSelectedFiles(prev => {
        const newFiles = prev ? [...prev] : [];
        if (!event.target.files) return prev;
        newFiles[index] = event.target.files[0];
        return newFiles;
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedFiles) {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.set(`files${i}`, selectedFiles[i]);
      }

      try {
        sub(formData, {
          method: 'post',
          encType: 'multipart/form-data',
          action: `/admin/${page?.slug}/constructor/${element.id}/upload`,
          navigate: false,
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };
  const [inputInstance, setInputInstance] = useState(1);
  return (
    <div className={styles.container}>
      {element.type !== 'ImageBlock' && (
        <button onClick={() => setInputInstance(prev => prev + 1)}>
          Add image
        </button>
      )}

      <Form
        className={styles.form}
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        {Array.from({length: inputInstance}).map((_, index) => (
          <div className={styles.wrapper} key={index}>
            <label className={styles.label} htmlFor={`file${index}`}>
              Background image
            </label>
            <input
              className={styles.addImageButton}
              type="file"
              name={`files${index}`}
              onChange={e => handleFileChange(e, index)}
            />

            {element.type !== 'ImageBlock' && (
              <>
                <label htmlFor={`caption${index}`}>Caption</label>
                <input type="text" name={`caption${index}`} />
              </>
            )}
            {imagePreviews.length !== 0 && (
              <div className={styles.imagePrev}>
                <p className={styles.prevLabel}>Preview image</p>
                {imagePreviews[index] && (
                  <img
                    className={styles.imagePreviewWrapper}
                    src={`${imagePreviews[index]}`}
                    alt={`Preview ${index}`}
                  />
                )}
              </div>
            )}
          </div>
        ))}
        <div className={styles.imagePrev}>
          <p className={styles.prevLabel}>Loaded image</p>
          {prevContentImg ? (
            <img
              className={styles.imagePreviewWrapper}
              src={`/uploads/${prevContentImg[0].name}`}
              alt={prevContentImg[0].name}
            />
          ) : null}
        </div>

        <button className={styles.submit} type="submit">
          Save image
        </button>
      </Form>
    </div>
  );
}
