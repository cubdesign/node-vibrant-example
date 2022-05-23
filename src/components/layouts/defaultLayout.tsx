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

const Container = styled("div")`
  padding: 0 2rem;
`;

const Main = styled("main")`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
