import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {Form, useSubmit} from '@remix-run/react';
import {useState} from 'react';
import {PageBlockInstance} from '~/components/PageConstructorBlocks/PageConstructorBlocks';

export default function Dropzone({
  element,
  page,
}: {
  page?: SerializeFrom<Page>;
  element: PageBlockInstance;
}) {
  console.log('🚀 ~ Dropzone ~ page:', page);
  const sub = useSubmit();
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
    <>
      <button onClick={() => setInputInstance(prev => prev + 1)}>
        Add image
      </button>
      <Form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        {Array.from({length: inputInstance}).map((_, index) => (
          <div key={index}>
            <label htmlFor={`file${index}`}>Load image</label>
            <input
              type="file"
              name={`files${index}`}
              onChange={e => handleFileChange(e, index)}
            />
            <label htmlFor={`caption${index}`}>Caption</label>
            <input type="text" name={`caption${index}`} />
            {imagePreviews[index] && (
              <img
                style={{maxWidth: '100px', maxHeight: '100px'}}
                src={imagePreviews[index]}
                alt={`Preview ${index}`}
              />
            )}
          </div>
        ))}

        <button type="submit">Save</button>
      </Form>
    </>
  );
}
