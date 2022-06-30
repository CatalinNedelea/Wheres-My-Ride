import styled from "styled-components";

export const MainWrapper = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #f0f8ff;
  align-items: center;
`;

export const Item = styled.h1`
  display: flex;
  width: auto;
`;

// export const Body = styled.body`
//   font-family: "Helvetica Neue", Helvetica, Arial;
//   font-size: 14px;
//   line-height: 20px;
//   font-weight: 400;
//   color: #3b3b3b;
//   -webkit-font-smoothing: antialiased;
//   background: #2b2b2b;

//   @media screen and (max-width: 580px) {
//     font-size: 16px;
//     line-height: 22px;
//   }
// `;

export const Wrapper = styled.div`
  margin: 0 auto;
  padding: 40px;
  max-width: 800px;
`;

export const Table = styled.table`
  margin: 0 0 40px 0;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  display: table;
  @media screen and (max-width: 580px) {
    display: block;
  }
`;

export const Row = styled.tr`
  display: table-row;
  background: #f6f6f6;

  &:nth-of-type(odd) {
    background: #e9e9e9;
  }
  // &.header
  //   font-weight: 900;
  //   color: #ffffff;
  //   background: #ea6153;

  &.green {
    background: #27ae60;
  }
  &.blue {
    background: #2980b9;
  }
  @media screen and (max-width: 580px) {
    padding: 14px 0 7px;
    display: block;
  }

`;

export const Cell = styled.td`
  padding: 6px 12px;
  display: table-cell;
  @media screen and (max-width: 580px) {
    padding: 2px 16px;
    display: block;
  }
`;
