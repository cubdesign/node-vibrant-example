import { getFileName } from "@/utils/fileUtils";
import { mq } from "@/utils/mq";
import styled from "@emotion/styled";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

// previewを追加
type ExtendFile = File & {
  preview: string;
};

type DropZoneWithPreviewProps = {
  defaultValue?: string[];
  onChange?: (images: string[]) => void;
};

const isSameFile = (a: File, b: File): boolean => {
  return a.name === b.name && a.size === b.size && a.type === b.type;
};
const hasFile = (files: File[], targetFile: File): boolean => {
  return files.some((file) => {
    return isSameFile(file, targetFile);
  });
};

const Container = styled("div")``;

const DropArea = styled("p")`
  margin: 0 0 8px 0;
  background-color: #676767;
  padding: 1rem 3rem;
  display: flex;
  align-items: center;
  height: 100px;
  ${mq("sm")} {
    height: 200px;
  }
`;

const ThumbnailArea = styled("aside")`
  display: flex;
  flex-wrap: wrap;
`;

const Thumbnail = styled("img")`
  max-width: 100px;
`;

const DropZoneWithPreview: React.FC<DropZoneWithPreviewProps> = ({
  defaultValue,
  onChange,
}) => {
  const [files, setFiles] = useState<ExtendFile[]>([]);
  const [initDefaultValue, setInitDefaultValue] = useState<boolean>(false);

  useEffect(() => {
    const fetchAll = () => {
      Promise.all(
        defaultValue!.map((url) => {
          return fetch(url)
            .then((response) => response.blob())
            .then(
              (blob) =>
                new File(
                  [blob],
                  getFileName(url) ? getFileName(url) : "image.jpg"
                )
            )
            .then(
              (file): ExtendFile =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
            );
        })
      ).then((loadFile) => {
        // TODO ごちゃごちゃしてる
        const newFiles: ExtendFile[] = [...files, ...loadFile];
        setFiles(newFiles);
        if (onChange) {
          onChange(
            newFiles.map((file: ExtendFile) => {
              return file.preview;
            })
          );
        }
        setInitDefaultValue(true);
      });
    };

    if (!initDefaultValue) {
      if (defaultValue && defaultValue.length > 0) {
        fetchAll();
      } else {
        // デフォルト無し
        setInitDefaultValue(true);
      }
    }
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const loadFiles: ExtendFile[] = [];
      for (let i: number = 0; i < acceptedFiles.length; i++) {
        const acceptedFile: File = acceptedFiles[i];
        const loadFile: ExtendFile = Object.assign(acceptedFile, {
          preview: URL.createObjectURL(acceptedFile),
        });

        if (!hasFile(files, loadFile)) {
          // 違うファイル
          loadFiles.push(loadFile);
        } else {
          // 同じファイル
          URL.revokeObjectURL(loadFile.preview);
        }
      }
      // TODO ごちゃごちゃしてる
      const newFiles: ExtendFile[] = [...files, ...loadFiles];
      setFiles(newFiles);
      if (onChange) {
        onChange(
          newFiles.map((file: ExtendFile) => {
            return file.preview;
          })
        );
      }
    },
    [files, onChange]
  );

  const thumbnails = useMemo(() => {
    return files.map((file: ExtendFile) => {
      return (
        <div key={file.name}>
          <Thumbnail
            src={file.preview}
            // Revoke data uri after image is loaded
            onLoad={() => {
              // URL.revokeObjectURL(file.preview);
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
    <Container>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <DropArea>
          Drag &apos;n&lsquo; drop some files here, or click to select files
        </DropArea>
        <ThumbnailArea>{thumbnails}</ThumbnailArea>
      </div>
    </Container>
  );
};
export default DropZoneWithPreview;
