// import { Form } from "@remix-run/react";
// import { useState } from "react";
// import { PageBlockInstance } from "~/components/PageConstructorBlocks/PageConstructorBlocks";

// export default function Dropzone({ elementInstance }: { elementInstance: PageBlockInstance }) {
//   const [imageProperties, setImageProperties] = useState({
//     align: 'center',
//     width: '100%',
//     height: 'auto',
//     caption: 'Image Caption',
//   });

//   const handleAlignChange = (newAlign: string) => {
//     setImageProperties(prevProperties => ({
//       ...prevProperties,
//       align: newAlign,
//     }));
//   };

//   const handleWidthChange = (newWidth: string) => {
//     setImageProperties(prevProperties => ({
//       ...prevProperties,
//       width: newWidth,
//     }));
//   };

//   const handleHeightChange = (newHeight: string) => {
//     setImageProperties(prevProperties => ({
//       ...prevProperties,
//       height: newHeight,
//     }));
//   };

//   const handleCaptionChange = (newCaption: string) => {
//     setImageProperties(prevProperties => ({
//       ...prevProperties,
//       caption: newCaption,
//     }));
//   };
//   const handleSave = (e?: React.ChangeEvent<HTMLInputElement>) => {
//     const fileName = e?.target.value.slice(
//       e.target.value.lastIndexOf('\\') + 1
//     );

//     const updatedElement = {
//       ...elementInstance,
//       additionalProperties: {
//         ...elementInstance.additionalProperties,
//         path: fileName ? fileName : elementInstance.additionalProperties!.path,

//         align: imageProperties.align,
//         width: imageProperties.width,
//         height: imageProperties.height,
//         caption: imageProperties.caption,
//       },
//     };

//   };
//   return (
//     <>
//       <Form
//         method="post"
//         action="/main/constructor/upload"
//         encType="multipart/form-data"
//       >
//         <label>
//           Select file:
//           <input type="file" name="file" onChange={e => handleSave(e)} />
//         </label>
//         <button type="submit">Upload</button>
//       </Form>
//       <div>
//         <h2>Image Controls</h2>
//         <label>
//           Align:
//           <select
//             value={imageProperties.align}
//             onChange={e => handleAlignChange(e.target.value)}
//           >
//             <option value="left">Left</option>
//             <option value="center">Center</option>
//             <option value="right">Right</option>
//           </select>
//         </label>
//         <br />
//         <label>
//           Width:
//           <input
//             type="text"
//             value={imageProperties.width}
//             onChange={e => handleWidthChange(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Height:
//           <input
//             type="text"
//             value={imageProperties.height}
//             onChange={e => handleHeightChange(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Caption:
//           <input
//             type="text"
//             value={imageProperties.caption}
//             onChange={e => handleCaptionChange(e.target.value)}
//           />
//         </label>
//         <br />

//         <button onClick={() => handleSave()}>Save</button>
//       </div>
//     </>
//   );
// }
