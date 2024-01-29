import React from "react";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import "./Writer.css";
const Writer = ({ writer }) => {
  return (
    <Container className="m-5">
      <Row>
        <Col md={4}>
          <Image src={writer?.photo} alt={writer?.name} roundedCircle fluid />
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>{writer?.name}</Card.Title>
              <Card.Text>Email: {writer?.email}</Card.Text>
              <Card.Text>Status: {writer?.status}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Writer;
