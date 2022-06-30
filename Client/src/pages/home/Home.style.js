import styled from "styled-components";

export const Frame = styled.div`
  /* position: relative;
  justify-content: space-between;
  flex-direction: row;
  display: flex; */
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  top: 20%;
  left: 50%;
  position: absolute;
  text-align: center;
  @media (min-width: 730px) {
    left: 20%;
  }
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

export const Input = styled.input`
  background-color: #f8f8ff;
  height: 10%;
  width: 75%;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 1rem;
`;

export const Utility = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 5%;
  text-align: center;
  font-size: 18px;
  border-radius: 1rem;
  background-color: #2f4f4f;
  width: auto;
  height: auto;
  z-index: 1;
`;

export const MapFrame = styled.div`
  display: flex;
  justify-content: center;
`;

export const ButtonContainer = styled.button`
  margin-top: 0.5rem;
  border-radius: 1rem;
  background-color: #e6e6fa;
`;

export const Paragraph = styled.p`
  margin-right: 2rem;
  margin-left: 2rem;
`;
