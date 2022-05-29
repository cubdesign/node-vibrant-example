import type { GetServerSideProps, NextPageWithLayout } from "next";

import absoluteUrl from "next-absolute-url";

import {
  getVibrantList,
  VibrantResult,
  VibrantSource,
} from "@/lib/ColorAnalyzer";

import VibrantBlock from "@/components/VibrantBlock";

import { ReactElement } from "react";
import DefaultLayout, { Title } from "@/components/layouts/defaultLayout";
import getSampleVibrantSource from "@/fixtures/sampleData";

type ServerRenderingPageProps = {
  vibrantResultListString: string;
};

const ServerRenderingPage: NextPageWithLayout<ServerRenderingPageProps> = ({
  vibrantResultListString,
}) => {
  const vibrantResultList: VibrantResult[] = JSON.parse(
    vibrantResultListString
  );

  return (
    <>
      <Title>
        node-vibrant example
        <br /> ( SSR )
      </Title>

      {vibrantResultList.map((vibrantResult: VibrantResult, index: number) => {
        return (
          <VibrantBlock
            key={`VibrantBlock${index}`}
            vibrantResult={vibrantResult}
          />
        );
      })}
    </>
  );
};

ServerRenderingPage.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout
      title="node-vibrant example ( SSR )"
      description="node-vibrant example ( SSR )"
    >
      {page}
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const vibrantSourceList: VibrantSource[] = getSampleVibrantSource();

  const { origin } = absoluteUrl(context.req);

  const ua: string = context.req.headers["user-agent"] || "";

  const vibrantResultList: VibrantResult[] = await getVibrantList(
    vibrantSourceList,
    origin,
    ua
  );
  console.log(JSON.stringify(vibrantResultList));
  const props: ServerRenderingPageProps = {
    vibrantResultListString: JSON.stringify(vibrantResultList),
  };

  return {
    props: props,
  };
};

export default ServerRenderingPage;
