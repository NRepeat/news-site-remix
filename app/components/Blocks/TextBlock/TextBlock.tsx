import {CiTextAlignLeft} from 'react-icons/ci';
import {
  BlocksType,
  PageBlock,
  PageBlockInstance,
} from '~/components/PageConstructorBlocks/PageConstructorBlocks';

import {withZod} from '@remix-validated-form/with-zod';
import {z} from 'zod';

import {Link} from '@remix-run/react';
import Editor from '~/components/Editor/Editor';
import {CustomElement, CustomText} from '~/components/TextEditors/custom-types';

export type TextBlockInstanceType = PageBlockInstance & {
  additionalProperties: typeof additionalProperties;
};

const type: BlocksType = 'TextBlock';

const additionalProperties = {
  label: 'Text Block',
  required: false,
  placeHolder: 'Text',
  content: '',
};

export const TextBlock: PageBlock = {
  type,

  construct: ({id}) => ({
    id,
    type,
    additionalProperties,
  }),
  constructorSideBarButton: {
    icon: CiTextAlignLeft,
    label: 'Text ',
  },
  constructorComponent: ConstructorComponent,
  previewComponent: PreviewComponent,
  propertiesComponent: PropertiesComponent,
};

function PreviewComponent({
  elementInstance,
}: {
  elementInstance: PageBlockInstance;
}) {
  return <Editor id={elementInstance.id} />;
}

function ConstructorComponent({
  elementInstance,
  editorMode,
}: {
  elementInstance: PageBlockInstance;
  editorMode: boolean;
}) {
  const serialize = (node: CustomElement) => {
    if (node.type === 'paragraph') {
      const paragraphNode = node.children[0] as CustomText;
      const text = paragraphNode.text;
      return <p data-custom-key={text}>{text}</p>;
    } else if (node.type === 'image') {
      const imageUrl = node.url;
      return <img data-custom-key={imageUrl} src={imageUrl as string} alt="" />;
    } else {
      return null;
    }
  };

  let D;
  const textElement = elementInstance as TextBlockInstanceType;
  console.log('🚀 ~ textElement:', textElement);
  if (textElement.additionalProperties.content) {
    const content = JSON.parse(textElement.additionalProperties.content);
    const renderedComponents = content.map((node: CustomElement) =>
      serialize(node)
    );
    D = renderedComponents;
  }

  return (
    <>
      {!editorMode && (
        <div>
          <h3>{textElement.additionalProperties.label}</h3>

          {textElement.additionalProperties.content && <span>{D}</span>}
        </div>
      )}
      {editorMode && <Editor id={elementInstance.id} />}
    </>
  );
}

export const textBlockFormPropertiesValidation = withZod(
  z.object({
    id: z.coerce.string(),
    label: z.string(),
  })
);

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: PageBlockInstance;
}) {
  return (
    <div>
      <div>
        <Link to={`/main/constructor/${elementInstance.id}/edit`}>Edit</Link>
        <button>Delete</button>
      </div>
    </div>
  );
}
