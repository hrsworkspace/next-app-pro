import styled from "styled-components";

const ButtonDiv = styled.button``;

const Main = styled.div`
  overflow: auto;
  max-width: 100%;
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  width: 190px;
  border: 10px solid green;
  border-radius: 10%;
  padding: 10px;
  margin: 20px;
  text-align: center;
  :hover {
    cursor: pointer;
    border-radius: 20%;
    background: #f1f4f4;
  }
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

export { CardDiv, ButtonDiv, Container, Main };
