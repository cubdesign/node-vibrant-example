import type { GetServerSideProps, NextPageWithLayout } from "next";

import absoluteUrl from "next-absolute-url";

import {
  getVibrantList,
  VibrantResult,
  VibrantSource,
} from "@/lib/ColorAnalyzer";

import VibrantBlock from "@/components/VibrantBlock";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import DefaultLayout, { Title } from "@/components/layouts/defaultLayout";
import PlaygroundInput from "@/components/PlaygroundInput";
import getSampleVibrantSource from "@/fixtures/sampleData";

type PlaygroundPageProps = {
  origin: string;
};

const initialVibrantSourceList: VibrantSource[] = getSampleVibrantSource();

const PlaygroundPage: NextPageWithLayout<PlaygroundPageProps> = ({
  origin,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [vibrantSourceList, setVibrantSourceList] = useState<VibrantSource[]>(
    []
  );

  const [vibrantResultList, setVibrantResultList] = useState<VibrantResult[]>(
    []
  );

  const load = useCallback(async () => {
    const vibrantResultList: VibrantResult[] = await getVibrantList(
      vibrantSourceList,
      origin
    );
    setLoading(false);
    setVibrantResultList(vibrantResultList);
  }, [vibrantSourceList, origin]);

  useEffect(() => {
    setLoading(false);
    load();
  }, [vibrantSourceList, load]);

  return (
    <>
      <Title>
        node-vibrant example
        <br /> ( Playground )
      </Title>
      <PlaygroundInput
        initialVibrantSourceList={initialVibrantSourceList}
        origin={origin}
        onChange={(vibrantSourceList) => {
          setVibrantSourceList(vibrantSourceList);
        }}
      />
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
