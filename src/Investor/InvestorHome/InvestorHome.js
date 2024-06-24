import { Box, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, ProgressBar, Row } from "react-bootstrap";
import CardSkeleton from "../../CommonComponents/Card Skeleton/CardSkeleton";
import useApi from "../../hooks/useApi";
import { endpoints } from "../../services/defaults";
import { Link } from "react-router-dom";
import Header from "../../CommonComponents/Header/Header";



export const InvestorHome = () => {
  const [projects, setProject] = useState([]);
  const { request: getProjects } = useApi("get");
  const [loading, setLoading] = useState(true);

  const navObj = [
    { text: "Home", link: "/" },
    { text: "My Projects", link: "/investor/projects" },
    { text: "Messages", link: "/innovator/messages" },
  ];

  const getAllProjects = async () => {
    try {
      let apiResponse;
      const url = `${endpoints.GET_PROJECTS}`;
      apiResponse = await getProjects(url);
      const { response, error } = apiResponse;
      console.log(apiResponse);
      if (!error && response) {
        setProject(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getAllProjects();
    }, 2000);
  }, []);

  return (
    <div>
      <Header navObj={navObj} />

      {loading ? (
        <CardSkeleton />
      ) : (
        <div>
          <Container>
            <Row>
              {projects && projects.length > 0 ? (
                projects.map((project, index) =>  <Col lg={4} sm={6} className="p-3" key={index}>
                <Card className="rounded-0 border-0 text-black grey-card">
                
                  <Card.Img
                    src={`http://127.0.0.1:8000/${project.image}`}
                    className="project-image rounded-0 m-0"
                  />
                  <Card.Body className="m-0">
                    <h3 className="project-title bg-white py-3 text-center mx-auto">
                      {project.project_name}
                    </h3>
                    <Card.Text style={{ textAlign: 'justify' }}>
                      {project.description.slice(0, 100) + "..."}
                    </Card.Text>
                    <ProgressBar
                      variant="success"
                      className="striped"
                      now={(project.amount_raised / project.amount) * 100}
                      label={`₹${project.amount_raised}`}
                      title={`₹${project.amount_raised} / ₹${project.amount}`}
                      data-bs-theme="dark"
                    />
                    <small>Target: ₹{project.amount}</small>
                    <div className="text-end">
                      <Link to={`/projectview/${project.id}`}>
                        <Button
                          variant="outline-dark rounded-0"
                          className="ms-auto "
                        >
                          <i className="fa-solid fa-arrow-right"></i>
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>)
              ) : (
                <div className="text-danger text-center"><b>No Projects Available....!</b></div>
              )}
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};
