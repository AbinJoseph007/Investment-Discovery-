import React, { useEffect, useState } from "react";
import Header from "../../CommonComponents/Header/Header";
import { Card, Col, Container, ProgressBar, Row } from "react-bootstrap";
import useApi from "../../hooks/useApi";
import { endpoints } from "../../services/defaults";
import { useParams } from "react-router-dom";

function InvestedProjects() {
  const navObj = [
    { text: "Dashboard", link: "/investor/home" },
    { text: "My Projects", link: "/investor/projects" },
    { text: "Payments", link: "/investor/payments" },
    { text: "Messages", link: "/innovator/messages" },
  ];

  const { request: investedProjects } = useApi("get");
  const [investedProject, setInvestedProject] = useState("");
  const { id } = useParams();
  const getInvestedProjects = async () => {
    try {
      const getInvestedProjectsUrl = `${endpoints.GET_INVESTOR_LIST}${id}`;
      let InvestedProjectsDetails = await investedProjects(
        getInvestedProjectsUrl
      );
      const { response, error } = InvestedProjectsDetails;
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvestedProjects();
  }, []);
  return (
    <>
      <div className="sticky-top">
        <Header navObj={navObj} />
      </div>
      <Container>
        <Row
          className="mt-5
        "
        >
          <Col lg={4} sm={6} className="p-3">
            <Card className="rounded-0 border-0 text-black grey-card">
              <Card.Img
                src={`http://127.0.0.1:8000/`}
                className="project-image rounded-0 m-0"
              />
              <Card.Body className="m-0">
                <h3 className="project-title bg-white py-3 text-center mx-auto">
                  project-title
                </h3>
                <Card.Text style={{ textAlign: "justify" }}></Card.Text>
                <ProgressBar />
                <small></small>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default InvestedProjects;
