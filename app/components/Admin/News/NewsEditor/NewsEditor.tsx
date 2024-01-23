import {Bold} from '@tiptap/extension-bold';
import {Image as ImageExtension} from '@tiptap/extension-image';
import {Italic} from '@tiptap/extension-italic';
import {Link} from '@tiptap/extension-link';
import {Underline} from '@tiptap/extension-underline';
import {EditorContent, useEditor} from '@tiptap/react';
import {StarterKit} from '@tiptap/starter-kit';
import useSaveImage from '~/hooks/useSaveImage';
import ToolBar from './ToolBar/ToolBar';
import styles from './styles.module.css';
const NewsEditor = () => {
  const {saveImage} = useSaveImage();

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension,
      Bold,
      Underline,
      Italic,
      Link.configure({
        openOnClick: false,
      }),
    ],

    // onBlur: ((editor) => {

    //   const content = editor.editor.getHTML()
    // }),

    editorProps: {
      handleDrop: (view, event, slice, moved) => {
        if (
          !moved &&
          event.dataTransfer &&
          event.dataTransfer.files &&
          event.dataTransfer.files[0]
        ) {
          const file = event.dataTransfer.files[0];
          const _URL = window.URL || window.webkitURL;
          const img = new Image();
          img.src = _URL.createObjectURL(file);
          img.onload = () => {
            if (img.width > 5000 || img.height > 5000) {
              window.alert(
                'Your images need to be less than 5000 pixels in height and width.'
              );
            } else {
              saveImage({
                action: '/admin/news/1/upload/',
                file,
                navigate: false,
              });
              const image = new Image();
              image.src = '/uploads/1.jpg';
              image.onload = () => {
                const {schema} = view.state;
                const coordinates = view.posAtCoords({
                  left: event.clientX,
                  top: event.clientY,
                });
                if (!coordinates) throw new Error('Not found');
                const node = schema.nodes.image.create({src: '/uploads/1.jpg'});
                const transaction = view.state.tr.insert(
                  coordinates?.pos,
                  node
                );
                return view.dispatch(transaction);
              };
            }
          };
          return true;
        }
        return false;
      },
    },
    content: `
        <p>This is a basic example of implementing images. Drag to re-order.</p>
        <img src="https://source.unsplash.com/8xznAGy4HcY/800x400" />
        <img src="https://source.unsplash.com/K9QHL52rE2k/800x400" />
      `,
  });
  if (!editor) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.container}>
      <ToolBar editor={editor} />

      <EditorContent className={styles.editor} editor={editor} />
    </div>
  );
};

export default NewsEditor;
