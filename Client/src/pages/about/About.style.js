import styled from "styled-components";

export const Title = styled.h1`
  display: flex;
  justify-content: center;
  margin-right: 4rem;
  margin-left: 4rem;
`;

export const Item = styled.h2`
  display: flex;
  justify-content: center;
  margin-right: 4rem;
  margin-left: 4rem;
  @media (max-width: 700px) {
    font-size: 1rem;
  }
`;

export const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #dcdcdc;
  width: 100%;
  height: 25rem;
  text-align: center;
  box-shadow: 0 0 1rem 1rem white inset;
`;

export const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #e6e6fa;
  width: 100%;
  height: 30rem;
  text-align: center;
  box-shadow: 0 0 1rem 1rem white inset;
`;

export const Container3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff8dc;
  width: 100%;
  height: 18rem;
  text-align: center;
  box-shadow: 0 0 1rem 1rem white inset;
`;

export const Link = styled.a`
  color: black;
  text-decoration: none;
`;
