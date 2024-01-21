import React, { Fragment } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import head from "../assets/img/headphone.jpg"

const Layer = () => {
    return (
        <Fragment>
            <div className='layer'>
                <Container>
                    <Row>
                        <Col md={4} className="mb-4">
                        </Col>
                        <Col md={4} className="mb-4">
                            <Card bg="transparent" style={{ border: 'none', color: "white" }}>
                                <Card.Img variant="top" src={head} style={{ width: '50px', height: '50px', borderRadius:"50%" }} className="mx-auto" />
                                <Card.Body>
                                    <Card.Title className="text-center" >24/7 Customer service</Card.Title>
                                    <Card.Text style={{ color: "white" }}>

                                        We render service 24 hour 7 days. we are always at your service. thank you
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="mb-4">
                        </Col>
                    </Row>

                </Container>
            </div>

        </Fragment>
    )
}

export default Layer
