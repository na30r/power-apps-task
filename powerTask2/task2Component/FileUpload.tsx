import * as React from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export interface FileUploadProps {
  onFileUpload: (base64Data: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [base64File, setBase64File] = useState<string>("");

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const base64Data = await convertFileToBase64(file);

      setBase64File(base64Data);
      onFileUpload(base64Data);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <p>Drag & drop a file here, or click to select a file</p>
      {base64File && <p>file is uploaded</p>}
    </div>
  );
};

export default FileUpload;

async function convertFileToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const base64Data = reader.result.toString().split(",")[1];
        resolve(base64Data);
      } else {
        reject("Error reading file.");
      }
    };
    reader.onerror = () => {
      reject("Error reading file.");
    };
    reader.readAsDataURL(file);
  });
}
