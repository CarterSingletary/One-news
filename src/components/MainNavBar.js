import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import sanityClient from "../client";

export default function MainNavBar() {
  const [linkData, setLinkData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "category"]{
        title, 
      }`
      )
      .then((data) => setLinkData(data))
      .catch(console.error);
  }, []);

  return (
    <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
      <LinkContainer to={"/"}>
        <Navbar.Brand>One News</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {linkData &&
            linkData.map((link) => {
              return (
                <LinkContainer to={`/${link.title}`} key={link.title}>
                  <Nav.Link>{link.title}</Nav.Link>
                </LinkContainer>
              );
            })}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
