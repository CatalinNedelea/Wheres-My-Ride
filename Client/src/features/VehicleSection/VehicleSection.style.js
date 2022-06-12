import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Link = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;

export const MainWrapper = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  border: solid 1px red;
  margin-top: 1rem;
  max-width: 10rem;
  max-height: 5rem;
  margin-right: 1.5rem;
`;

export const CardBox = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-around;
  border: solid 1px orange;
`;

export const Element12 = styled.div`
  flex-direction: row;
  display: flex;
  border: solid 1px violet;
`;

export const VehicleImage = styled.img`
  max-width: 2rem;
  max-height: 2rem;
`;
