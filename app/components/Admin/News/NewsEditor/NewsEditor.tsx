import { SerializeFrom } from '@remix-run/node';
import { useNavigation, useSubmit } from '@remix-run/react';
import { Image as ImageExtension } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { Underline } from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import clsx from 'clsx';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import useOpacity from '~/hooks/useOpacity';
import useSaveImage from '~/hooks/useSaveImage';
import { PostWithTags } from '~/service/post.server';
import NewsToolBar from '../ToolBar/ToolBar';
import ToolBar from './ToolBar/ToolBar';
import styles from './styles.module.css';
type NewsEditorType = {
  post: SerializeFrom<PostWithTags>;
};

const NewsEditor = ({ post }: NewsEditorType) => {


  const { opacity, setOpacity } = useOpacity()
  const { saveImage } = useSaveImage();
  const [content, setContent] = useState<string>(JSON.parse(post.content));
  const [files, setFiles] = useState<File[]>([]);
  const navigation = useNavigation()

  const submit = useSubmit();

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
    // editable: opacity,
    onUpdate: editor => {
      const content = editor.editor.getHTML();
      setContent(content);
    },

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
              setFiles(prev => [file, ...prev]);
              const image = new Image();
              image.src = `/uploads/${file.name}`;
              image.onload = () => {
                const { schema } = view.state;
                const coordinates = view.posAtCoords({
                  left: event.clientX,
                  top: event.clientY,
                });
                if (!coordinates) throw new Error('Not found');
                const node = schema.nodes.image.create({ src: img.src });
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
    ${content ? content : ''}`,
  });
  const [loading, setLoading] = useState(false)
  if (!editor) {
    return <div>Loading...</div>;
  }
  const handleSubmit = () => {
    const formData = new FormData();
    setLoading(true)

    formData.set('postContent', content ? content : '');
    files.map(file =>
      saveImage({
        action: '/admin/news/1/upload/',
        file,
        navigate: false,
      })
    );

    submit(formData, {
      action: `/admin/news/${post.id}/edit`,
      method: 'post',
    });

    setInterval(() => setLoading(false), 1000)
  };
  const handlePreviewMode = () => {
    setOpacity(prev => !prev)
  }
  return (
    <>

      <div className={clsx({ [styles.loading]: loading })} >
        {navigation.state === 'submitting' || loading && <FaSpinner className={styles.spinner} />}
      </div>

      <div className={clsx(styles.container)}>

        <NewsToolBar opacity={opacity} handlePreviewMode={handlePreviewMode} handleSubmit={handleSubmit} post={post} />
        <div className={styles.wrapper}>
          <ToolBar opacity={opacity} editor={editor} />

          <EditorContent className={styles.editor} editor={editor} />
        </div>

      </div>
    </>

  );
};

export default NewsEditor;
