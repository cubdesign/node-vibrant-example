import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

// previewを追加
type ExtendFile = File & {
  preview: string;
};

type DropZoneWithPreviewProps = {
  defaultValue: string[];
};

const isSameFile = (a: File, b: File): boolean => {
  return a.name === b.name && a.size === b.size && a.type === b.type;
};
const hasFile = (files: File[], targetFile: File): boolean => {
  return files.some((file) => {
    return isSameFile(file, targetFile);
  });
};

const DropZoneWithPreview: React.FC<DropZoneWithPreviewProps> = ({
  defaultValue,
}) => {
  const [files, setFiles] = useState<ExtendFile[]>([]);

  useEffect(() => {
    /*
  fetch(urlString)
    .then(response => response.blob())
    .then(blob => new File([blob], "image.jpg"))
    .then(file => {
      // fileはFileオブジェクト
    })
  
    */
  }, [defaultValue]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: ExtendFile[] = [];
      for (let i: number = 0; i < acceptedFiles.length; i++) {
        const acceptedFile: File = acceptedFiles[i];
        const newFile: ExtendFile = Object.assign(acceptedFile, {
          preview: URL.createObjectURL(acceptedFile),
        });

        if (!hasFile(files, newFile)) {
          // 違うファイル
          newFiles.push(newFile);
        } else {
          // 同じファイル
          URL.revokeObjectURL(newFile.preview);
        }
      }
      setFiles([...files, ...newFiles]);
    },
    [files]
  );

  const thumbnails = useMemo(() => {
    return files.map((file: ExtendFile) => {
      return (
        <div key={file.name}>
          <img
            src={file.preview}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
            style={{
              maxWidth: "100px",
            }}
            alt={file.name}
          />
        </div>
      );
    });
  }, [files]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
    // 5MB
    maxSize: 1024 * 1024 * 5,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p
        style={{
          backgroundColor: "#676767",
          padding: "3rem 10rem",
        }}
      >
        Drag &apos;n&lsquo; drop some files here, or click to select files
      </p>
      <aside
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {thumbnails}
      </aside>
    </div>
  );
};
export default DropZoneWithPreview;
