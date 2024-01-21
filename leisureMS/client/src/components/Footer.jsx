import React from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


const Footer = () => {
    
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <Container>
                <Row>

                    <Col md={3}>
                        <p>leisure &copy; {currentYear} </p>
                    </Col>


                    <Col md={3}>
                        <h5> make your reservation</h5>

                    </Col>


                    <Col md={3}>
                        <h5>Location</h5>
                        <ul className="icon-list">     
                            <li><FontAwesomeIcon icon={faMapMarkerAlt} /> Lagos Nigeria</li>
                        </ul>
                    </Col>


                    <Col md={3}>
                        <h5>Contact Us</h5>
                        <ul className="icon-list">
                            <li><FontAwesomeIcon icon={faEnvelope} /> Support@leisure.com</li>
                            <li><FontAwesomeIcon icon={faPhone} /> +234 8888888888</li>
                            <li><FontAwesomeIcon icon={faPhone} /> +234 9999999999</li>
                        </ul>
                    </Col>
                </Row>
            </Container>

            {/* Navigation List */}
            <hr style={{ color: 'white' }} />
            <Navbar expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="#" style={{ color: 'white' }}>Home</Nav.Link>
                            <Nav.Link href="#" style={{ color: 'white' }} >About</Nav.Link>
                            <Nav.Link href="#" style={{ color: 'white' }} >Services</Nav.Link>
                            <Nav.Link href="#" style={{ color: 'white' }} >Contact</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </footer>
    );
};

export default Footer;
