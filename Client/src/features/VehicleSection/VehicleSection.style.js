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
  border-radius: 0.5rem;
  border: solid 1px black;
  background-color: #f0f8ff;
  box-shadow: 0.3rem 0.3rem 0.3rem grey;
  margin-top: 0.5rem;
  width: 10rem;
  height: 5rem;
  margin-right: 0.3rem;
  padding: 0.2rem;
`;

export const CardBox = styled.div`
  flex-direction: row;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
`;

export const Icon = styled.div`
  flex-direction: row;
  display: flex;
`;

export const VehicleImage = styled.img`
  max-width: 2rem;
  max-height: 2rem;
`;

export const Location = styled.div`
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
`;
