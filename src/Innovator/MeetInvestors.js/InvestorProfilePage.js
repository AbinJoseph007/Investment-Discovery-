import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams } from "react-router-dom";
import { endpoints } from "../../services/defaults";
import useApi from "../../hooks/useApi";

function InvestorProfilePage() {
  const { id } = useParams();
  const { request: GetInvestors } = useApi("get");
  const [investor, setInvestor] = useState([]);
  console.log(investor);
  const getSingleProfile = async () => {
    try {
      const url = `${endpoints.GET_INVESTOR_PROFILE}${id}`;
      const apiResponse = await GetInvestors(url);
      const { response, error } = apiResponse;
      console.log(response.data);
      if (!error && response) {
        setInvestor(response.data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch Profile", error);
    }
  };
  useEffect(() => {
    getSingleProfile();
  }, [id]);

  return (
    <div>
      {" "}
      <Container>
        <h3 className="pt-5">Investor Profile</h3>
        <Row>
          <Col></Col>
          <Col>
            <Card style={{ width: "18rem" }} className="my-5">
              <Card.Body>
                <Card.Title>{investor.username}</Card.Title>
                <Card.Text>{investor.full_name}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>{investor.id}</ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <a href={investor.email}>{investor.email}</a>
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <Card.Link href={investor.mobile}>
                    {investor.mobile}
                  </Card.Link>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default InvestorProfilePage;
