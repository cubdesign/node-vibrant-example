import styled from "@emotion/styled";

const StyledFooter = styled("footer")`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  justify-content: center;
  align-items: center;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    color: #eae8e8;

    &:hover,
    &:focus,
    &:active {
      color: #d7de06;
    }
  }
`;
const Footer = () => {
  return (
    <StyledFooter>
      <a href="https://cubdesign.com" target="_blank" rel="noopener noreferrer">
        &copy; cubdesign
      </a>
    </StyledFooter>
  );
};

export default Footer;
