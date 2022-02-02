import React from "react";
import { Col, Container, Row } from 'reactstrap';

export interface INavigationProps {
    height?: string;
    image?: string;
    title: string;
    headline: string;
}

const Header: React.FunctionComponent<INavigationProps> = props => {
   const { children, height, image, headline, title } = props;

   const headerStyle = {      
    background: 'linear-gradient(rgba(36, 20, 38, 0.5), rgba(36, 39, 38, 0.5)), url(' + image + ') no-repeat center center',
    WebkitBackgroundSize: 'cover',
    MozBackgroundSize: 'cover',
    OBackgroundSize: 'cover',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: height
};

   
    return(
        <header style={headerStyle}>
            <Container>
                <Row className="align-items-center text-center">
                    <Col>
                        <h1 className="display-4 text-white mt-5 mb-2">{title}</h1>
                        <h3 className="mb-5 text-white">{headline}</h3>
                        {children}
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

Header.defaultProps = {
    height: '100%',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPw75ulpjppmviiNqAZeQEEqaV4ts0OKiLETUvc3cashLFDXbND7t4IcBXmOtKmC3Y6Jo&usqp=CAU'
}

export default Header;