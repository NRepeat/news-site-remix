import {Button} from '~/ui/Button/Button';

const SavePageButton = ({page}: {page: string}) => {
  console.log('🚀 ~ SavePageButton ~  page:', page);
  const handleSavePage = () => {
    window.localStorage.clear();
    // submit(
    //   {stringifyElements: stringifyElements},
    //   {action: `/${page}/constructor`, method: 'PUT'}
    // );
  };
  return (
    <Button onClick={handleSavePage}>
      <span>Save page</span>
    </Button>
  );
};

export default SavePageButton;
