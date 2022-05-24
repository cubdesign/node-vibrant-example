import styled from "@emotion/styled";
import type { GetServerSideProps, NextPageWithLayout } from "next";

import absoluteUrl from "next-absolute-url";

import {
  getVibrantList,
  VibrantResult,
  VibrantSource,
} from "@/lib/ColorAnalyzer";

import VibrantBlock from "@/components/VibrantBlock";
import { mq } from "@/utils/mq";
import { ReactElement, useCallback, useEffect, useState } from "react";
import DefaultLayout, { Title } from "@/components/layouts/defaultLayout";
import { useDropzone } from "react-dropzone";

type PlaygroundPageProps = {
  origin: string;
};

// previewを追加
type ExtendFile = File & {
  preview: string;
};

const MyDropzone = () => {
  const [files, setFiles] = useState<ExtendFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // acceptedFiles.forEach((file) => {
    //   const reader = new FileReader();

    //   reader.onabort = () => console.log("file reading was aborted");
    //   reader.onerror = () => console.log("file reading has failed");
    //   reader.onload = () => {
    //     // Do whatever you want with the file contents
    //     const binaryStr = reader.result;
    //     console.log(binaryStr);
    //   };
    //   reader.readAsArrayBuffer(file);
    // });
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const thumbs = files.map((file: ExtendFile) => (
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
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
        {thumbs}
      </aside>
    </div>
  );
};

const PlaygroundPage: NextPageWithLayout<PlaygroundPageProps> = ({
  origin,
}) => {
  const vibrantSourceList: VibrantSource[] = [
    {
      emoji: "👾",
      type: "emoji",
    },
    {
      emoji: "🎁",
      type: "emoji",
    },
    {
      emoji: "💨",
      type: "emoji",
    },
    {
      emoji: "😅",
      type: "emoji",
    },
    {
      emoji: "🙅🏻‍♂️",
      type: "emoji",
    },
    {
      file: "/images/elza-kurbanova-f8MLY_HKwqQ-unsplash.jpg",
      type: "image",
    },
    {
      file: "/images/erik-mclean-9y1cTVKe1IY-unsplash.jpg",
      type: "image",
    },
    {
      file: "/images/max-zhang-gkdyrA_eOo8-unsplash.jpg",
      type: "image",
    },

    {
      file: "/images/zhang_d-cCatH3q6o9M-unsplash.jpg",
      type: "image",
    },
    {
      file: "/images/david-clode-fT2qXggBlks-unsplash.jpg",
      type: "image",
    },
  ];

  const [loading, setLoading] = useState<boolean>(true);

  const [vibrantResultList, setVibrantResultList] = useState<VibrantResult[]>(
    []
  );

  useEffect(() => {
    const load = async () => {
      const vibrantResultList: VibrantResult[] = await getVibrantList(
        vibrantSourceList,
        origin
      );
      setLoading(false);
      setVibrantResultList(vibrantResultList);
    };

    load();
  }, []);

  return (
    <>
      <Title>node-vibrant example ( Playground )</Title>

      <div>
        <h2>emoji</h2>
        <input type={"text"} />
        <h2>画像</h2>
        <MyDropzone></MyDropzone>
      </div>

      {loading
        ? "now loading ..."
        : vibrantResultList.map(
            (vibrantResult: VibrantResult, index: number) => {
              return (
                <VibrantBlock
                  key={`VibrantBlock${index}`}
                  vibrantResult={vibrantResult}
                />
              );
            }
          )}
    </>
  );
};

PlaygroundPage.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout
      title="node-vibrant example ( Playground )"
      description="node-vibrant example ( Playground )"
    >
      {page}
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { origin } = absoluteUrl(context.req);

  const props: PlaygroundPageProps = {
    origin: origin,
  };

  return {
    props: props,
  };
};

export default PlaygroundPage;
