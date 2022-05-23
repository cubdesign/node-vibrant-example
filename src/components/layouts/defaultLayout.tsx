import { mq } from "@/utils/mq";
import styled from "@emotion/styled";
import Head from "next/head";
import { ReactElement } from "react";
import Footer from "../ui/Footer";
import Header from "../ui/Header";

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
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
};

export default DefaultLayout;
