import { Editor } from '@tiptap/react';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '~/ui/Button/Button';
import styles from './styles.module.css';

const ToolBar = ({ editor, opacity }: { opacity: boolean, editor: Editor }) => {
  useEffect(() => {
    if (!editor) {
      console.error('Editor not found');
    }
  }, [editor]);

  const { handleToggleLink, toggle: toggleLink } = SetToggleLink(editor);
  const { handleToggleBold, toggle: toggleBold } = SetToggleBold(editor);
  const { handleToggleItalic, toggle: toggleItalic } = SetToggleItalic(editor);
  const { handleToggleStrikethrough, toggle: toggleStrikethrough } =
    SetToggleStrikethrough(editor);
  const { handleToggleUnderline, toggle: toggleUnderline } =
    SetToggleUnderline(editor);
  const { handleToggleCode, toggle: toggleCode } = SetToggleCode(editor);
  return (
    <div style={{ display: `${opacity ? "none" : "inline-flex"}` }} className={styles.container}>
      <EditorToolBarButton
        editor={editor}
        isActive={toggleLink}
        onClick={handleToggleLink}
      >
        A
      </EditorToolBarButton>
      <EditorToolBarButton
        editor={editor}
        isActive={toggleBold}
        onClick={handleToggleBold}
      >
        Bold
      </EditorToolBarButton>
      <EditorToolBarButton
        editor={editor}
        isActive={toggleItalic}
        onClick={handleToggleItalic}
      >
        Italic
      </EditorToolBarButton>
      <EditorToolBarButton
        editor={editor}
        isActive={toggleUnderline}
        onClick={handleToggleUnderline}
      >
        U
      </EditorToolBarButton>
      <EditorToolBarButton
        editor={editor}
        isActive={toggleStrikethrough}
        onClick={handleToggleStrikethrough}
      >
        --
      </EditorToolBarButton>
      <EditorToolBarButton
        editor={editor}
        isActive={toggleCode}
        onClick={handleToggleCode}
      >
        {'<>'}
      </EditorToolBarButton>
    </div>
  );
};

export default ToolBar;

type EditorToolBarButtonType = {
  onClick: (editor: Editor) => void;
  editor: Editor;
  isActive?: boolean;
  disable?: boolean;
  children: React.ReactNode;
};

const EditorToolBarButton = ({
  onClick,
  disable,
  editor,
  isActive,
  children,
}: EditorToolBarButtonType) => (
  <Button
    onClick={() => onClick(editor)}
    disabled={disable}
    className={clsx(styles.button, { [styles.isActive]: isActive })}
  >
    {children}
  </Button>
);



export const SetToggleBold = (editor: Editor) => {
  const [toggle, setToggle] = useState<boolean>(editor.isActive('bold'));

  const handleToggleBold = () => {
    editor.chain().focus().toggleBold().run();
    setToggle(prev => !prev)
  };

  return { handleToggleBold, toggle };
};
export const SetToggleItalic = (editor: Editor) => {
  const [toggle, setToggle] = useState<boolean>(editor.isActive('italic'));

  const handleToggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
    setToggle(prev => !prev)
  };

  return { handleToggleItalic, toggle };
};
export const SetToggleUnderline = (editor: Editor) => {
  const [toggle, setToggle] = useState<boolean>(editor.isActive('underline'));

  const handleToggleUnderline = () => {
    editor.chain().focus().toggleUnderline().run();
    setToggle(prev => !prev)
  };

  return { handleToggleUnderline, toggle };
};
export const SetToggleStrikethrough = (editor: Editor) => {
  const [toggle, setToggle] = useState<boolean>(editor.isActive('strike'));

  const handleToggleStrikethrough = () => {
    editor.chain().focus().toggleStrike().run();
    setToggle(prev => !prev)
  };

  return { handleToggleStrikethrough, toggle };
};

export const SetToggleCode = (editor: Editor) => {
  const [toggle, setToggle] = useState<boolean>(editor.isActive('code'));

  const handleToggleCode = () => {
    editor.chain().focus().toggleCode().run();
    setToggle(prev => !prev)
  };

  return { handleToggleCode, toggle };
};

export const SetToggleLink = (editor: Editor) => {
  const [toggle, setToggle] = useState<boolean>(editor.isActive('link'));

  const handleToggleLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) {
      setToggle(!toggle);
      return;
    }
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      setToggle(!toggle);
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    setToggle(!toggle);
  }, [editor, toggle]);

  return { handleToggleLink, toggle };
};
