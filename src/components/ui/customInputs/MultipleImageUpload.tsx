// import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';

// interface ImageUploadDropBoxProps {
//   onChange: (files: File[]) => void;
//   initialImages?: string[]; // Server-side images (URLs or file paths)
//   serverImageIds?: string[]; // Image identifiers for deletion
//   disabled?: boolean;
//   onDeleteImage?: (imageId: string) => void; // Callback for deleting server images
// }

// const ImageUploadDropBox: React.FC<ImageUploadDropBoxProps> = ({
//   onChange,
//   initialImages = [],
//   serverImageIds = [],
//   disabled,
//   onDeleteImage,
// }) => {
//   const [dragActive, setDragActive] = useState(false);
//   const [previews, setPreviews] = useState<string[]>(initialImages);
//   const [files, setFiles] = useState<File[]>([]); // Store the actual File objects
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Handle drag events
//   const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(true);
//   };

//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(true);
//   };

//   const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//   };

//   // Process file drop
//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     const droppedFiles = e.dataTransfer.files;
//     const newFiles: File[] = [];
//     const newPreviews: string[] = [];

//     for (let i = 0; i < droppedFiles.length; i++) {
//       const file = droppedFiles[i];
//       if (file.type.startsWith('image/')) {
//         newFiles.push(file);
//         newPreviews.push(URL.createObjectURL(file));
//       }
//     }

//     if (newFiles.length > 0) {
//       setFiles((prevFiles) => [...prevFiles, ...newFiles]);
//       setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
//       onChange([...files, ...newFiles]);
//     }
//   };

//   // Handle file selection via the hidden input
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const selectedFiles = e.target.files;
//       const newFiles: File[] = [];
//       const newPreviews: string[] = [];

//       for (let i = 0; i < selectedFiles.length; i++) {
//         const file = selectedFiles[i];
//         if (file.type.startsWith('image/')) {
//           newFiles.push(file);
//           newPreviews.push(URL.createObjectURL(file));
//         }
//       }

//       if (newFiles.length > 0) {
//         setFiles((prevFiles) => [...prevFiles, ...newFiles]);
//         setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
//         onChange([...files, ...newFiles]);
//       }
//     }
//   };

//   // Handle file removal
//   const handleRemoveImage = (index: number) => {
//     const newFiles = files.filter((_, i) => i !== index);
//     const newPreviews = previews.filter((_, i) => i !== index);

//     setFiles(newFiles);
//     setPreviews(newPreviews);
//     onChange(newFiles); // Send the updated list of files to parent
//   };

//   // Handle server-side image removal
//   const handleRemoveServerImage = (imageId: string) => {
//     if (onDeleteImage) {
//       // Call the onDeleteImage function passed from the parent
//       onDeleteImage(imageId);
//     }
//     // Optionally, you can also remove the image from the previews list
//     setPreviews((prev) => prev.filter((preview) => preview !== imageId));
//   };

//   // Trigger file selection on click
//   const handleClick = () => {
//     if (inputRef.current) {
//       inputRef.current.click();
//     }
//   };

//   return (
//     <div>
//       <input
//         ref={inputRef}
//         type="file"
//         accept="image/*"
//         multiple
//         onChange={handleChange}
//         style={{ display: 'none' }}
//         disabled={disabled}
//       />
//       <div
//         onClick={handleClick}
//         onDragEnter={handleDragEnter}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         className={`border-2 border-dashed p-4 min-h-48 rounded cursor-pointer text-center ${
//           dragActive ? 'border-blue-500' : 'border-gray-300'
//         }`}
//       >
//         {previews.length > 0 ? (
//           <div className="grid grid-cols-3 gap-2">
//             {previews.map((preview, index) => (
//               <div key={index} className="relative">
//                 <img
//                   src={preview}
//                   alt={`Preview ${index}`}
//                   className="object-contain h-24 w-full"
//                 />
//                 <button
//                   onClick={() => handleRemoveImage(index)}
//                   className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
//                 >
//                   X
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>Drag and drop images here or click to upload</p>
//         )}
//       </div>

//       {/* Render server images with delete button */}
//       {serverImageIds.length > 0 && (
//         <div className="mt-4">
//           <h4 className="font-semibold">Uploaded Server Images</h4>
//           <div className="grid grid-cols-3 gap-2">
//             {serverImageIds.map((imageId) => (
//               <div key={imageId} className="relative">
//                 <img
//                   src={imageId} // Assuming these are image URLs
//                   alt={`Server Image ${imageId}`}
//                   className="object-contain h-24 w-full"
//                 />
//                 <button
//                   onClick={() => handleRemoveServerImage(imageId)}
//                   className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
//                 >
//                   X
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageUploadDropBox;

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';

interface ImageUploadDropBoxProps {
  onChange: (files: File[]) => void;
  initialImages?: string[]; // URLs for already uploaded images
  onDeleteImage?: (imageUrl: string) => void;
  disabled?: boolean;
}

const ImageUploadDropBox: React.FC<ImageUploadDropBoxProps> = ({ onChange, initialImages = [], onDeleteImage, disabled }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>(initialImages);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle drag events
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  // Process file drop
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith("image/"));
      if (filesArray.length > 0) {
        const fileURLs = filesArray.map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...fileURLs]);
        setSelectedFiles(prev => [...prev, ...filesArray]);
        onChange([...selectedFiles, ...filesArray]); // Send new files to parent
      }
    }
  };

  // Handle file selection via the hidden input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).filter(file => file.type.startsWith("image/"));
      if (filesArray.length > 0) {
        const fileURLs = filesArray.map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...fileURLs]);
        setSelectedFiles(prev => [...prev, ...filesArray]);
        onChange([...selectedFiles, ...filesArray]); // Send new files to parent
      }
    }
  };

  // Remove image when clicking the delete button
  const handleDelete = (index: number, imageUrl: string, isServerImage: boolean) => {
    if (isServerImage && onDeleteImage) {
      onDeleteImage(imageUrl); // Mark server image for deletion
    }

    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));

    // Update parent with new file list
    onChange(selectedFiles.filter((_, i) => i !== index));
  };

  // Trigger file selection on click
  const handleClick = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLButtonElement) {
      e.stopPropagation(); // Prevent triggering file input when clicking delete button
    } else if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        style={{ display: 'none' }}
        disabled={disabled}
      />

      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed p-4 min-h-48 rounded cursor-pointer text-center ${
          dragActive ? 'border-blue-500' : 'border-gray-300'
        }`}
      >
        {previewImages.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {previewImages.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt="Preview" className="object-cover h-24 w-full rounded-md" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering file input
                    handleDelete(index, image, initialImages.includes(image));
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Drag and drop images here or click to upload</p>
        )}
      </div>
    </div>
  );
};

export default ImageUploadDropBox;

