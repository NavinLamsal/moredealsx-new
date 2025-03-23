import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';

interface ImageUploadDropBoxProps {
  onChange: (file: File | null) => void;
  initialImage?: string;
  disabled?: boolean;
}

const ImageUploadDropBox: React.FC<ImageUploadDropBoxProps> = ({ onChange, initialImage, disabled }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialImage || null);
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(file));
        onChange(file);
      } else {
        // Optionally, handle non-image file error here
        onChange(null);
      }
    }
  };

  // Handle file selection via the hidden input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(file));
        onChange(file);
      } else {
        // Optionally, handle non-image file error here
        onChange(null);
      }
    }
  };

  // Trigger file selection on click
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
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
        {preview ? (
          <img src={preview} alt="Preview" className="object-contain h-48 w-full" />
        ) : (
          <p>Drag and drop an image here or click to upload</p>
        )}
      </div>
    </div>
  );
};

export default ImageUploadDropBox;
