import {useSubmit} from '@remix-run/react';
import {useCallback, useEffect, useRef, useState} from 'react';
import sanitizeHtml from 'sanitize-html';
import {z} from 'zod';
import {Button} from '~/ui/Button/Button';
import {PageBlockInstance} from '../PageConstructorBlocks/PageConstructorBlocks';
import style from './styles.module.css';
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
    <div className={style.textEditor}>
      <p className={style.title}>Text Editor</p>

      <div className={style.editContainer}>
        <div className={style.textStyle}>
          <p>Text styles</p>
          <EditButton cmd="italic" />
          <EditButton cmd="bold" />
          <EditButton cmd="formatBlock" arg="h1" name="heading" />
          {/* <EditButton
            cmd="createLink"
            arg="https://github.com/lovasoa/react-contenteditable"
            name="hyperlink"
          /> */}

          <Button
            className={style.button}
            onMouseDown={() =>
              handleTextDecorationChange({textDecoration: 'underline'})
            }
          >
            underline
          </Button>
        </div>

        <div className={style.textAlign}>
          <p>Text align</p>
          <Button
            className={style.button}
            onMouseDown={() => handleTextAlignChange({textPosition: 'left'})}
          >
            Left
          </Button>
          <Button
            className={style.button}
            onMouseDown={() => handleTextAlignChange({textPosition: 'center'})}
          >
            Center
          </Button>
          <Button
            className={style.button}
            onMouseDown={() => handleTextAlignChange({textPosition: 'right'})}
          >
            Right
          </Button>
        </div>
        <div className={style.fontStyles}>
          <p>Font styles</p>
          <label className={style.fontSize}>
            Font size
            <input
              className={style.fontSizeInput}
              type="number"
              value={fontSize}
              onChange={handleFontSizeChange}
              min="1"
              max="100"
            />
          </label>
        </div>
      </div>

      <div
        ref={editorRef}
        className={style.editableContent}
        contentEditable
        onBlur={handleContentChange}
        style={content.styles}
        dangerouslySetInnerHTML={{__html: content}}
      />
      <Button className={style.saveButton} onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

const EditButton = (props: {cmd: string; arg?: string; name?: string}) => {
  return (
    <Button
      className={style.button}
      onMouseDown={evt => {
        evt.preventDefault();
        document.execCommand(props.cmd, false, props.arg);
      }}
    >
      {props.name || props.cmd}
    </Button>
  );
};
export default TextEditor;
