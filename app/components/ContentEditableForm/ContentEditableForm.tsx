import React, {useState, useEffect} from 'react';
import sanitizeHtml from 'sanitize-html';
import useConstructor from '~/hooks/useConstructor';
import {PageBlockInstance} from '../PageConstructorBlocks/PageConstructorBlocks';

const ContentEditableForm = ({
  elementInstance,
}: {
  elementInstance: PageBlockInstance;
}) => {
  const [content, setContent] = useState('<p>Type your post here...</p>');
  const [fontSize, setFontSize] = useState(16);
  const [alignment, setAlignment] = useState<CanvasTextAlign | undefined>(
    'left'
  );
  const {updateElement} = useConstructor();

  useEffect(() => {
    const sanitizeConf = {
      allowedTags: ['p'],
      allowedAttributes: {a: ['href']},
    };

    const sanitizedContent = sanitizeHtml(content, sanitizeConf);

    const styledContent = `<div style="font-size: ${fontSize}px; text-align: ${alignment}; width: 400px;">${sanitizedContent}</div>`;

    setContent(styledContent);
  }, [content, fontSize, alignment]);

  const handleChangeAlignment = (newAlignment: CanvasTextAlign) => {
    setAlignment(newAlignment);
  };

  const handleChangeFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value, 10);
    setFontSize(newSize);
  };

  const onContentBlur = React.useCallback(
    (evt: React.FocusEvent<HTMLDivElement, Element>) => {
      const sanitizeConf = {
        allowedTags: ['p'],
        allowedAttributes: {a: ['href']},
      };

      const sanitizedContent = sanitizeHtml(
        evt.currentTarget.innerHTML,
        sanitizeConf
      );

      const styledContent = `<div style="font-size: ${fontSize}px; text-align: ${alignment}; width: 400px;">${sanitizedContent}</div>`;

      setContent(styledContent);
    },
    [fontSize, alignment]
  );

  const handleSave = () => {
    const serializedContent = JSON.stringify(content);

    const updatedElement = {
      ...elementInstance,
      additionalProperties: {
        ...elementInstance.additionalProperties,
        content: serializedContent,
      },
    };
    updateElement({id: updatedElement.id, element: updatedElement});
  };

  return (
    <div>
      <h2>Post Editor</h2>
      <div
        contentEditable
        onBlur={onContentBlur}
        dangerouslySetInnerHTML={{__html: content}}
        style={{textAlign: alignment, width: '400px'}}
      />
      <input type="number" value={fontSize} onChange={handleChangeFontSize} />
      <button onClick={() => handleChangeAlignment('left')}>Align Left</button>
      <button onClick={() => handleChangeAlignment('center')}>
        Align Center
      </button>
      <button onClick={() => handleChangeAlignment('right')}>
        Align Right
      </button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ContentEditableForm;
