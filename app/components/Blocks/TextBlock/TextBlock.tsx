import {CiTextAlignLeft} from 'react-icons/ci';
import {
  BlocksType,
  PageBlock,
  PageBlockInstance,
} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
// import styles from './styles.module.css';

import {Link} from '@remix-run/react';
import PropertiesComponent from './PropertiesComponent/PropertiesComponent';
import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';

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
  let content = '<div>Not found</div>';
  if (elementInstance.additionalProperties?.content) {
    content = JSON.parse(
      elementInstance.additionalProperties?.content as string
    );
  }
  return <div dangerouslySetInnerHTML={{__html: content}} />;
}

function ConstructorComponent({
  elementInstance,
  page,
}: {
  elementInstance: PageBlockInstance;
  page?: SerializeFrom<Page>;
}) {
  let defaultContent: TextElementContentType = {
    content: '<div>Not found</div>',
    styles: {},
  };

  if (elementInstance.additionalProperties?.content) {
    const parsedContent: TextElementContentType = JSON.parse(
      elementInstance.additionalProperties?.content as string
    );

    if (parsedContent) {
      defaultContent = parsedContent;
    }
  }

  const contentStyles: React.CSSProperties =
    typeof defaultContent.styles === 'string' ? {} : defaultContent.styles;

  return (
    <div>
      <Link
        prefetch="render"
        reloadDocument={true}
        to={`/admin/${page?.slug}/constructor/${elementInstance.id}/edit`}
      >
        Edit content
      </Link>
      {defaultContent && (
        <div
          style={contentStyles}
          dangerouslySetInnerHTML={{__html: defaultContent.content}}
        />
      )}
    </div>
  );
}

type TextElementContentType = {
  content: string;
  styles: string | React.CSSProperties;
};
