import {EditorContent, useEditor} from '@tiptap/react';
import {StarterKit} from '@tiptap/starter-kit';

const NewsEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],

    content: '<p>Hello World! 🌎️</p>',
  });

  return <EditorContent editor={editor} />;
};

export default NewsEditor;
