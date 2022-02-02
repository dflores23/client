import React from "react";
import { Container, Nav, Navbar, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";

export interface INavigationProps {}

const Navigation: React.FunctionComponent<INavigationProps> = props => {
    return (
        <Navbar color="light" light sticky="top" expand="md">
            <Container>
                <NavbarBrand tag={Link} to="/">📚</NavbarBrand>
                <Nav className="mr-auto" navbar />
            </Container>
        </Navbar>
    );
}

export default Navigation;