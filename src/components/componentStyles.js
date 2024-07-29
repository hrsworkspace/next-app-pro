import styled from "styled-components";

export const Main = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  background-color: aqua;
  align-items: center;
  flex-direction: row;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
  width: 100%;
  height: 32px;
  padding: 16px;
`;

export const NavDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: red;
`;
