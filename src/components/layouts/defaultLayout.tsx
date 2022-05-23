import { mq } from "@/utils/mq";
import styled from "@emotion/styled";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import PageLoading from "../ui/PageLoading";

type DefaultLayoutProps = {
  title: string;
  description: string;
  children: ReactElement;
};

const Container = styled("div")``;

const Main = styled("main")`
  min-height: 100vh;
  padding: 2rem 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled("h1")`
  margin: 0;
  line-height: 1.15;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  ${mq("sm")} {
    font-size: 4rem;
  }
`;

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  title,
  description,
  children,
}) => {
  /*
    ページ遷移時、loadingを表示させる。
    loadingを入れないと、ページの変化に気づかない
    
    How to make Custom Loading Screen in Next.js Project
    https://blog.bhagyamudgal.me/how-to-make-custom-loading-screen-in-nextjs-project
  */
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url: string) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main>{loading ? <PageLoading /> : children}</Main>
      <Footer />
    </Container>
  );
};

export default DefaultLayout;
