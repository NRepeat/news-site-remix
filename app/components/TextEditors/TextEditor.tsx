import {useSubmit} from '@remix-run/react';
import {useCallback, useEffect, useRef, useState} from 'react';
import sanitizeHtml from 'sanitize-html';
import {PageBlockInstance} from '../PageConstructorBlocks/PageConstructorBlocks';
import {z} from 'zod';

type StylesChange = {
  fontSize?: string;
  textPosition?: 'left' | 'right' | 'center';
  textDecoration?: 'underline' | '';
};
export const contentValidator = z.string().min(0);

const TextEditor = ({element}: {element: PageBlockInstance}) => {
  const [fontSize, setFontSize] = useState<StylesChange['fontSize']>('16');
  const [textAlign, setTextAlign] =
    useState<StylesChange['textPosition']>('left');
  const [textDecoration, setTextDecoration] =
    useState<StylesChange['textDecoration']>('');
  const editorRef = useRef<HTMLDivElement>(null);
  const elementContent = element.additionalProperties?.content
    ? JSON.parse(element.additionalProperties?.content as string)
    : 'Your text...';
  const [styles, setStyles] = useState<Record<string, string>>(
    elementContent.style ?? {}
  );

  const [content, setContent] = useState(
    elementContent.content ?? elementContent
  );
  useEffect(() => {}, []);

  const handleTextAlignChange = ({textPosition}: StylesChange) => {
    setTextAlign(textPosition);
    handleContentChange();
  };
  const handleTextDecorationChange = ({textDecoration}: StylesChange) => {
    setTextDecoration(prev => (prev === textDecoration ? '' : textDecoration));
    handleContentChange();
  };
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(e.target.value);
    handleContentChange();
  };
  const handleContentChange = useCallback(() => {
    const sanitizeConf = {
      allowedTags: ['div', 'b', 'i', 'em', 'strong', 'a', 'p', 'h1'],
      allowedAttributes: {a: ['href'], div: ['style']},
    };

    const divElement = editorRef.current;

    if (divElement) {
      divElement.style.fontSize = `${fontSize}px`;
      divElement.style.textAlign = textAlign || 'left';
      divElement.style.textDecoration = textDecoration || '';
      setStyles({
        fontSize: `${fontSize}px`,
        textAlign: textAlign || 'left',
        textDecoration: textDecoration || '',
      });
    }

    const sanitizedContent = sanitizeHtml(
      divElement?.innerHTML || content,
      sanitizeConf
    );
    setContent(sanitizedContent);
  }, [fontSize, textAlign, textDecoration, content]);
  useEffect(() => {
    handleContentChange();
  }, [handleContentChange]);

  const sub = useSubmit();
  const handleSave = () => {
    const serializedData = JSON.stringify({content, styles});

    sub(
      {
        id: element.id,
        content: contentValidator.parse(serializedData),
        type: 'textEditor',
      },
      {method: 'post'}
    );
  };
  return (
    <div className="text-editor">
      <label>
        Размер текста:
        <input
          type="number"
          value={fontSize}
          onChange={handleFontSizeChange}
          min="1"
          max="100"
        />
      </label>

      <div
        ref={editorRef}
        className="editable-content"
        contentEditable
        onBlur={handleContentChange}
        style={content.styles}
        dangerouslySetInnerHTML={{__html: content}}
      />
      <EditButton cmd="italic" />
      <EditButton cmd="bold" />
      <EditButton cmd="formatBlock" arg="h1" name="heading" />
      <EditButton
        cmd="createLink"
        arg="https://github.com/lovasoa/react-contenteditable"
        name="hyperlink"
      />
      <button onMouseDown={() => handleTextAlignChange({textPosition: 'left'})}>
        Left
      </button>
      <button
        onMouseDown={() => handleTextAlignChange({textPosition: 'center'})}
      >
        Center
      </button>
      <button
        onMouseDown={() => handleTextAlignChange({textPosition: 'right'})}
      >
        Right
      </button>
      <button
        onMouseDown={() =>
          handleTextDecorationChange({textDecoration: 'underline'})
        }
      >
        underline
      </button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

const EditButton = (props: {cmd: string; arg?: string; name?: string}) => {
  return (
    <button
      onMouseDown={evt => {
        evt.preventDefault();
        document.execCommand(props.cmd, false, props.arg);
      }}
    >
      {props.name || props.cmd}
    </button>
  );
};
export default TextEditor;
