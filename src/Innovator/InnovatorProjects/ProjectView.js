import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  ListGroup,
  Modal,
  ProgressBar,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { endpoints } from "../../services/defaults";
import useApi from "../../hooks/useApi";
import "./InnovatorProject.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import CardSkeleton from "../../CommonComponents/Card Skeleton/CardSkeleton";
import Header from "../../CommonComponents/Header/Header";

function ProjectView() {
  const [project, setProject] = useState(null);
  const { request: projectview } = useApi("get");
  const { id } = useParams();
  const { request: UpdateProject } = useApi("post");

  const [updateInput, setUpdateInput] = useState({
    update_message: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navObj = [
    { text: "Home", link: "/" },
    { text: "My Projects", link: "/innovator/projects" },
    { text: "Messages", link: "/innovator/messages" },
  ];

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

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUpdateInput({ ...updateInput, [name]: value });
  };


  console.log(updateInput);

  if (!project) return <div><CardSkeleton/></div>;

  const handleUpdate=async(e)=>{
    try {
      const url = `${endpoints.UPDATE_PROJECT}${id}`;
      const payload = {
        update_message:updateInput.update_message
      };
      const apiResponse = await UpdateProject(url,payload);
      console.log(apiResponse);
      const { response, error } = apiResponse;
      if (!error && response) {
        setProject(response.data[0]);
        toast.success('Project Updations added Successfully', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
      }
    } catch (error) {
      console.error("Failed to fetch project", error);
    }
  }

  return (
    <>
      <div className="sticky-top">
        <Header navObj={navObj} />
      </div>
      <div className="main-div">
        <Container fluid={"sm"} className="p-3 text-center">
          <div className="text-end">
            {" "}
            <Button onClick={handleShow}>Add Updations</Button>
          </div>

          <img
            className="img-fluid mb-3"
            src={`http://127.0.0.1:8000/${project.image}`}
            alt=""
            style={{ height: "400px" }}
          />
          <h1>{project.project_name}</h1>
          <p style={{ textAlign: "justify" }} className="mb-5">
            {project.description}
          </p>
          <div className="w-75 mx-auto my-2">
            <h3>Amount raised</h3>
            <ProgressBar
              variant="success"
              className="striped"
              now={(project.amount / project.amount) * 100}
              label={`₹${project.amount}`}
              title={`₹${project.amount} / ₹${project.targetAmount}`}
              style={{ height: "30px" }}
              data-bs-theme="dark"
            />
             <ListGroup className='w-75 mx-auto fw-bold  mb-5'>
            {project.investors?.map((i, index) =>
              <ListGroup.Item className='bg-transparent d-flex justify-content-evenly' key={index}>{i.name} <span className='vr mx-4'></span> ₹{i.amount}</ListGroup.Item>)}

          </ListGroup>
            <div className="d-flex justify-content-between mb-3">
              <p>Deadline: {project.end_date || "N/A"}</p>
              <p>
                Target Amount: <b>₹{project.amount}</b>
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Updations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
          className="input-field"
            type="text"
            placeholder="Message"
            name="update_message"
            value={updateInput.update_message}
            onChange={handleInput}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>handleUpdate(e)}>Save</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
    </>
  );
}

export default ProjectView;
