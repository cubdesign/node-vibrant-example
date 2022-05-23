import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

const StyledHeader = styled("header")`
  a {
    color: #eae8e8;
    font-size: 0.85rem;
  }
`;

const AppBar = styled("div")`
  display: flex;
  background-color: #110d87;
`;

const Logo = styled("div")`
  a {
    display: flex;
    align-items: center;
    padding: 1rem;
    text-align: center;
    background-color: #521188;

    &:hover,
    &:active {
      background-color: #d7de06;
    }
  }
`;

const Nav = styled("ul")`
  flex: 2;
  background-color: #ff0000;
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled("li")`
  display: flex;
  flex-grow: 1;
  padding: 0;
  margin: 0;
  background-color: #9d6060;

  a {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    text-align: center;
    background-color: #be0fbe;

    &:hover,
    &:active {
      background-color: #09dd5a;
    }
  }

  a.active {
    &::before {
      content: "🍬";
      padding-right: 8px;
    }
  }
`;

const Header = () => {
  const router = useRouter();

  return (
    <StyledHeader>
      <AppBar>
        <Logo>
          <Link href="/">
            <a>node-vibrant example</a>
          </Link>
        </Logo>
        <Nav>
          <NavItem>
            <Link href="/">
              <a className={router.pathname == "/" ? "active" : ""}>
                Playground
              </a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/client-rendering">
              <a
                className={
                  router.pathname == "/client-rendering" ? "active" : ""
                }
              >
                CSR
              </a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/server-rendering">
              <a
                className={
                  router.pathname == "/server-rendering" ? "active" : ""
                }
              >
                SSR
              </a>
            </Link>
          </NavItem>
          <NavItem>
            <a
              href="https://github.com/cubdesign/node-vibrant-example"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>
          </NavItem>
        </Nav>
      </AppBar>
    </StyledHeader>
  );
};

export default Header;
