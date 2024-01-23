import {CiTextAlignLeft} from 'react-icons/ci';
import {
  BlocksType,
  PageBlock,
  PageBlockInstance,
} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import styles from './styles.module.css';

import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import useOpacity from '~/hooks/useOpacity';
import ConstructorElementEditBar from '~/ui/ConstructorElementEditBar/ConstructorElementEditBar';
import PropertiesComponent from './PropertiesComponent/PropertiesComponent';

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
  let defaultContent: TextElementContentType = {
    content: '<div>Text Block</div>',
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
      {defaultContent && (
        <div
          className={styles.content}
          style={contentStyles}
          dangerouslySetInnerHTML={{__html: defaultContent.content}}
        />
      )}
    </div>
  );
}

function ConstructorComponent({
  elementInstance,
  page,
}: {
  elementInstance: PageBlockInstance;
  page?: SerializeFrom<Page>;
}) {
  let defaultContent: TextElementContentType = {
    content: '<div>Text Block</div>',
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
  const {opacity, setOpacity} = useOpacity();
  return (
    <div
      onMouseEnter={() => setOpacity(true)}
      onMouseLeave={() => setOpacity(false)}
      className={styles.container}
    >
      <ConstructorElementEditBar
        opacity={opacity}
        elementInstance={elementInstance}
        slug={page?.slug}
      />
      {defaultContent && (
        <div
          className={styles.content}
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
