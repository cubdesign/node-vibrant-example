import type { GetServerSideProps, NextPageWithLayout } from "next";

import absoluteUrl from "next-absolute-url";

import {
  getVibrantList,
  VibrantResult,
  VibrantSource,
} from "@/lib/ColorAnalyzer";

import VibrantBlock from "@/components/VibrantBlock";

import { ReactElement, useEffect, useState } from "react";
import DefaultLayout, { Title } from "@/components/layouts/defaultLayout";
import getSampleVibrantSource from "@/fixtures/sampleData";

type ClientRenderingPageProps = {
  origin: string;
};

const ClientRenderingPage: NextPageWithLayout<ClientRenderingPageProps> = ({
  origin,
}) => {
  const vibrantSourceList: VibrantSource[] = getSampleVibrantSource();

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
      <Title>
        node-vibrant example
        <br /> ( CSR )
      </Title>
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

ClientRenderingPage.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout
      title="node-vibrant example ( CSR )"
      description="node-vibrant example ( CSR )"
    >
      {page}
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { origin } = absoluteUrl(context.req);

  const props: ClientRenderingPageProps = {
    origin: origin,
  };

  return {
    props: props,
  };
};

export default ClientRenderingPage;
