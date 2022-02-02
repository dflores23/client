import React from "react";
import { Container } from "reactstrap";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import IPageProps from "../interfaces/pages";

const HomePage: React.FunctionComponent<IPageProps> = props => {
    return (
        <Container>
            <Navigation />
            <Header title="A Coding Blog Website" headline="Check what people can code!" />
            <Container>
                Blog stuff here...
            </Container>
        </Container>
    );
};

export default HomePage;