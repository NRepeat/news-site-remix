import { Page } from '@prisma/client';
import { SerializeFrom } from '@remix-run/node';
import { Form, useSubmit } from '@remix-run/react';
import { useRef, useState } from 'react';
import { PageBlockInstance } from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import { ImageBlockContentType } from '../ImageBlock';
import styles from './styles.module.css';

export default function Dropzone({
  element,
  page,
}: {
  page?: SerializeFrom<Page>;
  element: PageBlockInstance;
}) {
  if (!page) throw new Error("Page not found")
  const sub = useSubmit();
  const prevContentImg: ImageBlockContentType[] | null = element.additionalProperties?.content
    ? JSON.parse(element.additionalProperties?.content as string)
    : null;

  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[] | null>([]);
  const inputRef = useRef(null)

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files) {
      const newFiles = event.target.files;
      let newPreviews: string[] = []

      if (Array.isArray(imagePreviews)) newPreviews = [...imagePreviews];


      const processFile = (file: File, index: number) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          setImagePreviews(newPreviews);
        };

        reader.readAsDataURL(file);

        setSelectedFiles((prev) => {
          const newFiles = prev ? [...prev] : [];
          newFiles[index] = file;
          return newFiles;
        });
      };

      for (let i = 0; i < newFiles.length; i++) {
        processFile(newFiles[i], i);
      }
      setSelectedFiles(prev => {
        const newFiles = prev ? [...prev] : [];
        if (!event.target.files) return prev;
        newFiles[index] = event.target.files[index];
        return newFiles;
      });
    }

  };
  const handleRemoveImage = (index: number) => {
    if (inputRef.current) {
      inputRef.current = null;
    }

    setSelectedFiles(prev => {
      const newFiles = prev ? [...prev] : [];
      newFiles.filter((fl, i) => i !== index)
      return newFiles;
    });
    setImagePreviews((prev) => {
      if (Array.isArray(prev)) {
        const newPreviews = [...prev];
        newPreviews.splice(index, 1);
        return newPreviews;
      }
      return prev;
    });
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
          action: `/admin/main/constructor/${element.id}/upload`,
          navigate: false,
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };
  const inputInstance = 1
  return (
    <div className={styles.container}>


      <Form
        className={styles.form}
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        {Array.from({ length: inputInstance }).map((_, index) => (
          <div className={styles.wrapper} key={index}>
            <label className={styles.label} htmlFor={`file${index}`}>
              {element.type === 'SliderBlock' && <span>Slider images</span>}
              {element.type === 'ImageBlock' && <span>  Background image</span>}

            </label>
            <input
              ref={inputRef}
              multiple={element.type !== "ImageBlock" ? true : false}
              className={styles.addImageButton}
              type="file"
              name={`files${index}`}
              onChange={e => handleFileChange(e, index)}
            />

            {imagePreviews && imagePreviews.length !== 0 && (
              <>
                <button
                  type="button"
                  className={styles.removeImageButton}
                  onClick={() => handleRemoveImage(index)}
                >
                  Remove Image
                </button>
                <div className={styles.imagePrev}>
                  <p className={styles.prevLabel}>Preview image</p>
                  {imagePreviews.map((img, i) => (
                    <img
                      key={i}
                      className={styles.imagePreviewWrapper}
                      src={`${img}`}
                      alt={`Preview ${i}`}
                    />
                  ))}
                </div>
              </>

            )}

          </div>
        ))}
        <div className={styles.imagePrev}>
          <p className={styles.prevLabel}>Loaded image</p>
          {prevContentImg ? prevContentImg.map((img, i) => {
            return <img
              key={i}
              className={styles.imagePreviewWrapper}
              src={`/uploads/${prevContentImg[i].name}`}
              alt={img.name}
            />
          }

          ) : null}
        </div>

        <button className={styles.submit} type="submit">

          {element.type === "SliderBlock" && <span>Save images</span>}
          {element.type === "ImageBlock" && <span>Save image</span>}
        </button>
      </Form>
    </div>
  );
}
