import { PageBlockInstance } from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import TextEditor from '~/components/TextEditors/TextEditor';

const PropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: PageBlockInstance;
}) => {
  return (
    <TextEditor element={elementInstance} />
  );
};

export default PropertiesComponent;
