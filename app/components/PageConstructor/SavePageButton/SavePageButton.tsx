import {useSubmit} from '@remix-run/react';
import useConstructor from '~/hooks/useConstructor';
import {Button} from '~/ui/Button/Button';

const SavePageButton = () => {
  const submit = useSubmit();
  const {elements} = useConstructor();
  console.log('🚀 ~ SavePageButton ~  elements:', elements);
  const handleSavePage = () => {
    const stringifyElements = JSON.stringify(elements);
    console.log('🚀 ~ handleSavePage ~ stringifyElements:', stringifyElements);
    submit(
      {stringifyElements: stringifyElements},
      {action: '/constructor', method: 'PUT'}
    );
  };
  return (
    <Button onClick={handleSavePage}>
      <span>Save page</span>
    </Button>
  );
};

export default SavePageButton;
