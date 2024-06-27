import React, { useEffect, useState } from 'react'
import { Button, Container, ListGroup, ProgressBar, Row, Col, Card } from 'react-bootstrap'
import './InvestorProject.css'
import video1 from "../../Assets/ph-video-1.mp4";
import video2 from "../../Assets/ph-video-2.mp4";
import video3 from "../../Assets/ph-video-3.mp4";
import { Link, useParams } from 'react-router-dom';
import Footer from '../../CommonComponents/Footer/Footer';
import Header from '../../CommonComponents/Header/Header';
import { endpoints } from "../../services/defaults";
import useApi from "../../hooks/useApi";

function InvestorProjectView() {

  const [project, setProject] = useState('')
  const { id } = useParams();
  const { request: projectview } = useApi("get");

  const getSingleProject = async () => {
    try {
      const url = `${endpoints.PROJECT_VIEW}${id}`;
      const apiResponse = await projectview(url);
      const { response, error } = apiResponse;
      if (!error && response) {
        setProject(response.data[0]);

      }
    } catch (error) {
      console.error("Failed to fetch project", error);
    }
  };
  useEffect(() => {
    getSingleProject();
  }, [id]);

  console.log(project);




  const navObj = [{ text: 'Home', link: '/' }, { text: 'Projects', link: '/innovator/projects' }, { text: 'Messages', link: '' }]
  return (
    <>
      <div className='sticky-top'><Header navObj={navObj} /></div>

      <div className='main-div'>
        <div>
        <div className='d-flex justify-content-between'>
          <Link to={'/investor/home'}>
            <Button variant="outline-dark rounded-0 " className='ms-2 mt-2 rounded-pill'><i className="fa-solid fa-arrow-left"></i></Button>
          </Link>
          <Link to={'/investor/home'}>
            <Button variant="outline-dark rounded-0 " className='ms-2 mt-2 rounded-pill'><i className="fa-solid fa-arrow-left"></i></Button>
          </Link>
        </div>
        </div>

        <div className="main-div">
          <Container fluid={"sm"} className="p-3">
            <Row >
              <Col>
                <img
                  className="img-fluid mb-3"
                  src={`http://127.0.0.1:8000/${project.image}`}
                  alt=""
                  style={{ height: "400px" }}
                />
              </Col>
              <Col className=''>
                <Card className=' px-2 shadow' style={{ width: '100%', height: "400px" }}>

                  <Card.Body>
                    <Card.Title className='fs-3 text-center'>{project.project_name}</Card.Title>
                    <Card.Text>
                      <div style={{ textAlign: "justify" }} className='mt-4 px-3'>
                        {project.description}
                      </div>
                      <div className='fw-bold mt-3 px-3'>

                        <div className='text-center'>
                          Target Amount
                        </div>
                        <ProgressBar
                          variant="success"
                          className="striped"
                          now={(project.amount / project.amount) * 100}
                          label={`₹${project.amount}`}
                          title={`₹${project.amount} / ₹${project.targetAmount}`}
                          style={{ height: "30px" }}
                          data-bs-theme="dark"
                        />

                      
                      </div>

                      <p className='mt-5 px-3'>Deadline: {project.end_date || "N/A"}</p>

                     
                    </Card.Text>

                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

    </>

  )
}

export default InvestorProjectView