import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  ListGroup,
  ProgressBar,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import "./InvestorProject.css";
import video1 from "../../Assets/ph-video-1.mp4";
import video2 from "../../Assets/ph-video-2.mp4";
import video3 from "../../Assets/ph-video-3.mp4";
import { Link, useParams } from "react-router-dom";
import Footer from "../../CommonComponents/Footer/Footer";
import Header from "../../CommonComponents/Header/Header";
import { ToastContainer, toast, Slide } from "react-toastify";
import { endpoints } from "../../services/defaults";
import useApi from "../../hooks/useApi";
import { GiPayMoney } from "react-icons/gi";
import { AiFillMessage } from "react-icons/ai";
import { MdOutlineUpdate } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import Accordion from "react-bootstrap/Accordion";

function InvestorProjectView() {
  const [show, setShow] = useState(false);
  const [project, setProject] = useState("");
  const [projectUpdates, setProjectUpdates] = useState([]);
  const [investInput, setInvestInput] = useState({
    full_name: "",
    account_no: "",
    mobile_number: "",
    amount: 0,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();
  const { request: projectview } = useApi("get");
  const { request: investProject } = useApi("post");

  // payment
  const payment = async () => {
    Swal.fire({
      imageUrl:
        "https://cashfreelogo.cashfree.com/website/landings/instant-settlements/payment-done.png",
      imageHeight: 300,
      imageAlt: "Payment Successfull",
    });
    setShow(false);
  };

  //getSingleProject
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

  // get Project Updates
  const getProjectUpdates = async () => {
    try {
      const getProjectUpdatesUrl = `${endpoints.GET_PROJECT_UPDATE}${id}`;
      let updatesResponse = await projectview(getProjectUpdatesUrl);
      const { response, error } = updatesResponse;
      if (!error && response) {
        setProjectUpdates(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //INVEST_IN_PROJECT
  const InvestProject = async (e) => {
    e.preventDefault();
    try {
      const payload = investInput;
      let investUrl = `${endpoints.INVEST_IN_PROJECT}${id}`;
      let investResponse = await investProject(investUrl, payload);
      let { response, error } = investResponse;
      if (!error && response) {
        let responseMessage = "Succesfully Invested";
        toast.success(responseMessage, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        console.log("success");
        setInvestInput({
          full_name: "",
          account_no: "",
          mobile_number: "",
          amount: 0,
        });
        setShow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProject();
    getProjectUpdates();
  }, [id]);

  // console.log(project);

  const navObj = [
    { text: "Home", link: "/" },
    { text: "Projects", link: "/investor/project" },
    { text: "Messages", link: "/innovator/messages" },
  ];
  return (
    <>
      <div className="sticky-top">
        <Header navObj={navObj} />
      </div>

      <div className="main-div">
        <div>
          <div className="d-flex justify-content-between">
            <Link to={"/investor/home"}>
              <Button
                variant="dark rounded-0 "
                className="ms-2 mt-2 rounded-pill"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </Button>
            </Link>
            <Link to={"/innovator/messages"}>
              <AiFillMessage className="fs-1 mt-2 " color="black" />
            </Link>
          </div>
        </div>

        <div className="main-div">
          <Container fluid={"sm"} className="">
            <Row>
              <Col>
                <img
                  className="img-fluid mb-3"
                  src={`http://127.0.0.1:8000/${project.image}`}
                  alt=""
                  style={{ height: "400px", borderRadius: "10px" }}
                />
              </Col>
              <Col className="">
                <Card
                  className=" px-2 shadow"
                  style={{ width: "100%", height: "400px" }}
                >
                  <Card.Body>
                    <Card.Title className="fs-3 fw-bold text-center">
                      <h1>{project.project_name}</h1>
                    </Card.Title>
                    <Card.Text>
                      <div
                        style={{ textAlign: "justify" }}
                        className="mt-4 px-3"
                      >
                        <b>Description: </b>
                        {project.description}
                        <p className="mt-2">
                          <b>Deadline:</b> {project.end_date || "N/A"}
                        </p>
                      </div>
                      <div className="fw-bold mt-3 px-3">
                        <div className="text-center">
                          <h5>Target Amount</h5>{" "}
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
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <div className="text-center">
              <button
                className="btn btn-outline-secondary mt-2 w-50"
                onClick={handleShow}
              >
                Make Investment
                <GiPayMoney className="fs-4" />
              </button>
            </div>
            <div>
              <Accordion defaultActiveKey="1" className="my-3">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    {" "}
                    <h5>
                      {" "}
                      <MdOutlineUpdate /> See Project Updates
                    </h5>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      {projectUpdates?.length > 0
                        ? projectUpdates.map((project, index) => (
                            <p>[Date] {project.update_message}</p>
                          ))
                        : "No project Updates"}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <ToastContainer />

            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Payment Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="Full Name"
                  name="update_message"
                  onChange={(e) =>
                    setInvestInput({
                      ...investInput,
                      full_name: e.target.value,
                    })
                  }
                />
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="Account Number"
                  name="update_message"
                  onChange={(e) =>
                    setInvestInput({
                      ...investInput,
                      account_no: e.target.value,
                    })
                  }
                />
                <input
                  className="form-control mb-3"
                  type="number"
                  placeholder="Mobile Number"
                  name="update_message"
                  onChange={(e) =>
                    setInvestInput({
                      ...investInput,
                      mobile_number: e.target.value,
                    })
                  }
                />
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="Amount"
                  name="update_message"
                  onChange={(e) =>
                    setInvestInput({ ...investInput, amount: e.target.value })
                  }
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="success" onClick={InvestProject}>
                  Pay
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
        </div>
      </div>
    </>
  );
}

export default InvestorProjectView;
