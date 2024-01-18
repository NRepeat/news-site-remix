import {useMemo, useState} from 'react';
import {withHistory} from 'slate-history';
import {Editable, Slate, withReact} from 'slate-react';
import {CustomEditor} from './custom-types';

import {createEditor, Descendant} from 'slate';
import {Button} from '~/ui/Button/Button';
import useConstructor from '~/hooks/useConstructor';
import {TextBlockInstanceType} from '../Blocks/TextBlock/TextBlock';

const TextEditor = ({element}: {element: TextBlockInstanceType}) => {
  const {updateElement} = useConstructor();
  const initialValue: Descendant[] = element.additionalProperties.content
    ? JSON.parse(element.additionalProperties.content)
    : [{type: 'paragraph', children: [{text: ''}]}];

  const editor: CustomEditor = useMemo(
    () => withHistory(withReact(createEditor())),
    []
  );
  const [editorContent, setEditorContent] = useState<Descendant[]>([]);

  return (
    <Slate
      onChange={value => {
        setEditorContent(value);
      }}
      editor={editor}
      initialValue={initialValue}
    >
      <Button
        onClick={() => {
          const content = JSON.stringify(editorContent);
          const updatedElement = {
            ...element,
            additionalProperties: {...element.additionalProperties, content},
          };
          updateElement({id: updatedElement.id, element: updatedElement});
        }}
      >
        Save
      </Button>
      <Editable style={{width: '500px'}} placeholder="Enter some text..." />
    </Slate>
  );
};

export default TextEditor;
