import {useSubmit} from '@remix-run/react';

type useSaveImageType = {
  file: File;
  action: string;
  navigate: boolean;
};

const useSaveImage = () => {
  const submit = useSubmit();

  const saveImage = ({action, file, navigate}: useSaveImageType) => {
    const fileSize = (file.size / 1024 / 1024).toFixed(4);
    if (
      (file.type === 'image/jpeg' || file.type === 'image/png') &&
      fileSize < '10'
    ) {
      const imgData = new FormData();
      imgData.set('imgFile', file);

      return submit(imgData, {
        action,
        navigate,
        encType: 'multipart/form-data',
        method: 'post',
      });
    } else {
      window.alert(
        'Images need to be in jpg or png format and less than 10mb in size.'
      );
    }
  };

  return {saveImage};
};

export default useSaveImage;
