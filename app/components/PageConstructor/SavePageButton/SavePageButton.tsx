import {useSubmit} from '@remix-run/react';
import {useContext} from 'react';
import {PageConstructorContext} from '~/context/ConstructorContext/ConstructorContext';
import {Button} from '~/ui/Button/Button';

const SavePageButton = ({page}: {page: string}) => {
  const submit = useSubmit();
  const context = useContext(PageConstructorContext);
  if (!context) throw new Error();
  const {elements} = context;
  const handleSavePage = () => {
    const stringifyElements = JSON.stringify(elements);
    submit(
      {stringifyElements: stringifyElements},
      {action: `/${page}/constructor`, method: 'PUT'}
    );
  };
  return (
    <Button onClick={handleSavePage}>
      <span>Save page</span>
    </Button>
  );
};

export default SavePageButton;
