import styled from "styled-components";

export const Frame = styled.div`
  position: relative;
  justify-content: space-between;
  flex-direction: row;
  display: flex;
`;

export const Center = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  position: absolute;
  top: 3%;
  text-align: center;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Input = styled.div`
  min-height: 0.5rem;
  min-width: 2rem;
`;

export const Utility = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10%;
  text-align: center;
  font-size: 18px;
  border-radius: 1rem;
  background-color: teal;
  min-width: 2rem;
  min-height: 2rem;
  z-index: 1;
`;

export const MapFrame = styled.div`
  display: flex;
  justify-content: center;
`;
