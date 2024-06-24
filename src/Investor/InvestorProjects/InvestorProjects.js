import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  FormGroup,
  InputGroup,
  Modal,
  ProgressBar,
  Row,
} from "react-bootstrap";
import "./InvestorProject.css";
import { Link } from "react-router-dom";
import Footer from "../../CommonComponents/Footer/Footer";
import useApi from "../../hooks/useApi";
import { endpoints } from "../../services/defaults";
import Header from "../../CommonComponents/Header/Header";

function InvestorProjects() {
  const { request: getProjects } = useApi("get");
  const [allProject, setAllProject] = useState([]);

  const getAllProjects = async () => {
    try {
      const url = `${endpoints.GET_PROJECTS}`;
      const apiResponse = await getProjects(url);
      const { response, error } = apiResponse;
      if (!error && response) {
        setAllProject(response.data);
        console.log(response.data);
        console.log(allProject);
      }
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };


  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <>
      <div className="sticky-top">
        <Header />
      </div>
      <div className="main-div">
        <Container className="p-lg-5 p-2 text-center">
          <InputGroup size="lg" className="mb-3 w-75 mx-auto">
            <Form.Control
              className="border border-black"
              placeholder="Search..."
            />
            <InputGroup.Text className="border border-black">
              {" "}
              <i className="fa-solid fa-search"></i>
            </InputGroup.Text>
          </InputGroup>

          <Row>
            {allProject.length > 0
              ? allProject.map((project, index) => (
                  <Col lg={4} sm={6} className="p-3" key={index}>
                    <Card className="rounded-0 border-0 text-black grey-card">
                      <Card.Img
                        src={`http://127.0.0.1:8000/${project.image}`}
                        className="project-image rounded-0 m-0"
                      />
                      <Card.Body className="m-0">
                        <h3 className="project-title bg-white py-3 text-center mx-auto">
                          {project.project_name}
                        </h3>
                        <Card.Text>
                          {/* <p className="text-secondary m-0 p-0">
                            Innovator: {project.innovator}
                          </p> */}
                          {project.description}
                        </Card.Text>
                        <ProgressBar
                          variant="success"
                          className="striped"
                          now={
                            (project.amount / project.amount) * 100
                          }
                          label={`₹${project.AmountRaised}`}
                          title={`₹${project.AmountRaised} / ₹${project.amount}`}
                          data-bs-theme="dark"
                        />
                        <small>Target: ₹{project.amount}</small>
                        <div className="text-end">
                          <Link to={`/projectview/${project.id}`}>
                            <Button
                              variant="outline-dark rounded-0 "
                              className="ms-auto"
                            >
                              <i className="fa-solid fa-arrow-right"></i>
                            </Button>
                          </Link>
                        </div>{" "}
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              : "No projects"}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default InvestorProjects;
