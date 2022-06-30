import React from "react";
import {
  Link,
  Item,
  Container1,
  Container2,
  Container3,
  Title,
} from "./About.style";

export const AboutPage = () => {
  return (
    <div>
      <Container1>
        <Title>Our App</Title>
        <Item>
          Our web app aims to enchance the public transportation affair for all
          those who use it on the daily.
        </Item>
        <Item>
          We combine the latest technologies with a minimal design to bring the
          most organic and intuitive experience to all of our users.
        </Item>
        <Item>
          Together we can make the change. Together we can finally find out
          'Where's My Ride'.
        </Item>
      </Container1>
      <Container2>
        <Title>How it works</Title>
        <Item>
          We are making use of the very high-tech RaspberryPi to collect our
          data with regards to the location of our vehicles.
        </Item>
        <Item>
          We interpret that data by using the widely used Google APIs.
        </Item>
        <Item>
          We then proceed to send this processed information to our client
          application.
        </Item>
        <Item>And finally, the information is put at your disposal.</Item>
        <Item>All at a few clicks away.</Item>
      </Container2>
      <Container3>
        <Title>Contact us</Title>
        <Item>Email:nedelea.catalin98@gmail.com</Item>
        <Item>
          LinkedIn:{" "}
          <Link href="https://www.linkedin.com/in/c%C4%83t%C4%83linnedelea/">
            Catalin Nedelea
          </Link>
        </Item>
      </Container3>
    </div>
  );
};
