import styled from "styled-components";

const Main = styled.div`
  overflow: auto;
  max-width: 100%;
  height: 100%;
  width: 100%;
  margin-top: 100px;
`;
const CardDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;
  gap: 20;
  margin: 5px;
  .empty-state {
    margin: 60px auto;
    padding: 50px;
    font-size: 30px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }
`;

export { CardDiv, Main };
