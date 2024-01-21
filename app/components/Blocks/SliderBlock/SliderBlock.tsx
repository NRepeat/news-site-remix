import {
  BlocksType,
  PageBlock,
  PageBlockInstance,
} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import {BsFillFileImageFill} from 'react-icons/bs';
import styles from './styles.module.css';
import CustomSlider, {Slide} from './Slider/Slider';
import {useFetcher} from '@remix-run/react';

export type TextBlockInstanceType = PageBlockInstance & {
  additionalProperties: typeof additionalProperties;
};

const type: BlocksType = 'SliderBlock';

const additionalProperties = {
  label: 'Slider Block',
  required: false,
  path: [],
};
export const SliderBlock: PageBlock = {
  type,

  construct: ({id}) => ({
    id,
    type,
    additionalProperties,
  }),
  constructorSideBarButton: {
    icon: BsFillFileImageFill,
    label: 'Slider ',
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
  const images = elementInstance.additionalProperties!.path as string[];
  return (
    <div className={styles.sliderContainer}>
      <CustomSlider>
        {images.map((url, i) => (
          <Slide key={i} img={url} text={url} />
        ))}
      </CustomSlider>
    </div>
  );
}

export default PreviewComponent;

function ConstructorComponent({
  elementInstance,
}: {
  elementInstance: PageBlockInstance;
}) {
  return <>{elementInstance.additionalProperties?.label}</>;
}
function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: PageBlockInstance;
}) {
  // const [paths, setPaths] = useState<string[]>(elementInstance.additionalProperties!.path as string[])
  const f = useFetcher();
  // if (elementInstance.additionalProperties)

  const handleSaveElement = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('🚀 ~ handleSaveElement ~ e:', e);
    // const path = e?.target.value.slice(
    //   e.target.value.lastIndexOf('\\') + 1
    // );
    // paths.push(path)
    // console.log("🚀 ~ paths:", paths)

    // const updatedElement = {
    //   ...elementInstance,
    //   additionalProperties: {
    //     ...elementInstance.additionalProperties,
    //     path: paths

    //   },
  };

  return (
    <>
      <f.Form
        method="post"
        action="/main/constructor/upload"
        encType="multipart/form-data"
      >
        <label>
          Select file:
          <input type="file" name="file" onChange={e => handleSaveElement(e)} />
        </label>
        <button type="submit">Upload</button>
      </f.Form>
      {elementInstance.additionalProperties!.path}
    </>
  );
}
