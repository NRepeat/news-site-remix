import useConstructor from '~/hooks/useConstructor';
import TextEditor from '../TextEditors/TextEditor';
import {TextBlockInstanceType} from '../Blocks/TextBlock/TextBlock';

const Editor = ({id}: {id: string}) => {
  const {elements} = useConstructor();

  const editBlock = elements?.find(el => el.id === id);
  console.log('🚀 ~ Editor ~ editBlock:', editBlock);

  if (!editBlock) {
    return <div>Block with ID {id} not found</div>;
  }

  if (editBlock.type === 'TextBlock') {
    const textBlock = {...editBlock} as TextBlockInstanceType;
    return <TextEditor element={textBlock} />;
  }

  return <div>No editor available for block type: {editBlock.type}</div>;
};

export default Editor;
