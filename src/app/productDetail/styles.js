const { default: styled } = require("styled-components");

const Main = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  height: 50%;
  p {
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 25px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
`;

export { Main };
