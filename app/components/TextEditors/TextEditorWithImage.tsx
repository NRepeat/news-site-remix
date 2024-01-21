// import {useMemo} from 'react';
// import {Transforms, createEditor, Descendant} from 'slate';
// import {
//   Slate,
//   Editable,
//   useSlateStatic,
//   withReact,
//   ReactEditor,
//   RenderElementProps,
// } from 'slate-react';

// import {CustomEditor, ImageElement} from './custom-types';
// import {Button} from '~/ui/Button/Button';

// const InsertImageButton = () => {
//   const editor = useSlateStatic();
//   return (
//     <Button
//       onMouseDown={event => {
//         event.preventDefault();
//         const url = window.prompt('Enter the URL of the image:');
//         if (url && !isImageUrl(url)) {
//           alert('URL is not an image');
//           return;
//         }
//         url && insertImage(editor, url);
//       }}
//     >
//       image
//     </Button>
//   );
// };

// const Editor = () => {
//   const editor: CustomEditor = useMemo(
//     () => withImages(withHistory(withReact(createEditor()))),
//     []
//   );
//   const initialValue: Descendant[] = [
//     {
//       type: 'paragraph',
//       children: [{text: 'A line of text in a paragraph.'}],
//     },
//   ];

//   return (
//     <>
//       <Button>Save</Button>
//       <Slate editor={editor} initialValue={initialValue}>
//         <InsertImageButton />
//         <Editable
//           renderElement={props => {
//             return <Element {...props} />;
//           }}
//           placeholder="Enter some text..."
//         />
//       </Slate>
//     </>
//   );
// };

// const withImages = (editor: CustomEditor) => {
//   const {insertData, isVoid} = editor;

//   editor.isVoid = element => {
//     return element.type === 'image' ? true : isVoid(element);
//   };

//   editor.insertData = data => {
//     const text = data.getData('text/plain');
//     const {files} = data;

//     if (files && files.length > 0) {
//       for (const file of files) {
//         const reader = new FileReader();
//         const [mime] = file.type.split('/');

//         if (mime === 'image') {
//           reader.addEventListener('load', () => {
//             const url = reader.result;
//             insertImage(editor, url);
//           });

//           reader.readAsDataURL(file);
//         }
//       }
//     } else if (isImageUrl(text)) {
//       insertImage(editor, text);
//     } else {
//       insertData(data);
//     }
//   };

//   return editor;
// };

// const insertImage = (
//   editor: CustomEditor,
//   url: string | ArrayBuffer | null
// ) => {
//   const text = {text: ''};
//   const image: ImageElement = {type: 'image', url, children: [text]};
//   Transforms.insertNodes(editor, image);
// };

// const Element = (props: RenderElementProps) => {
//   const {attributes, children, element} = props;

//   switch (element.type) {
//     case 'image':
//       return <Image {...props} />;
//     default:
//       return <p {...attributes}>{children}</p>;
//   }
// };

// const Image = (props: RenderElementProps) => {
//   const {attributes, children, element} = props;
//   const newEl = {...element} as ImageElement;
//   const editor = useSlateStatic();
//   const path = ReactEditor.findPath(editor, element);

//   if (!newEl.url) throw new Error('Not found');
//   return (
//     <div {...attributes}>
//       {children}
//       <div contentEditable={false}>
//         <img
//           style={{maxWidth: '300px'}}
//           src={typeof newEl.url === 'string' ? newEl.url : undefined}
//           alt="s"
//         />
//         <Button onClick={() => Transforms.removeNodes(editor, {at: path})}>
//           Delete
//         </Button>
//       </div>
//     </div>
//   );
// };

// const isImageUrl = (url: string) => {
//   if (!url) return false;
//   if (!isUrl(url)) return false;
//   const ext = new URL(url).pathname.split('.').pop();
//   if (!ext) return null;
//   return ext;
// };

// export default Editor;
