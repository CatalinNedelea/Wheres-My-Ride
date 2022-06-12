import React, { useState } from "react";
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  Logo,
  OpenLinksButton,
  NavbarLinkExtended,
} from "./Header.style";
import LogoImg from "./logo.png";

function Navbar() {
  const [extendNavbar, setExtendNavbar] = useState(false);

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to="/"> Home</NavbarLink>
            <NavbarLink to="/vehicles"> Vehicles</NavbarLink>
            <NavbarLink to="/favorites"> Favorites</NavbarLink>
            <NavbarLink to="/about"> About Us</NavbarLink>
            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <Logo to="/account" src={LogoImg}></Logo>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer
          onClick={() => {
            setExtendNavbar((curr) => !curr);
          }}
        >
          <NavbarLinkExtended to="/"> Home</NavbarLinkExtended>
          <NavbarLinkExtended to="/vehicles"> Vehicles</NavbarLinkExtended>
          <NavbarLinkExtended to="/favorites"> Favorites</NavbarLinkExtended>
          <NavbarLinkExtended to="/about"> About Us</NavbarLinkExtended>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
