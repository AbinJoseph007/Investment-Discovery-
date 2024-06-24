import React from 'react'
import { Button, Container, ListGroup, ProgressBar } from 'react-bootstrap'
import './InvestorProject.css'
import video1 from "../../Assets/ph-video-1.mp4";
import video2 from "../../Assets/ph-video-2.mp4";
import video3 from "../../Assets/ph-video-3.mp4";
import { Link } from 'react-router-dom';
import Footer from '../../CommonComponents/Footer/Footer';
import Header from '../../CommonComponents/Header/Header';
function InvestorProjectView() {
  const project = {
    name: 'project3',
    coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCgn3Ii53eAxizXRbyO3R8Mlf-npKMr5G-_ycjbFrICg&s",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae numquam quod ipsa soluta quisquam ab consequatur quos vitae exercitationem omnis molestias, laboriosam earum neque dolore, eius, corrupti quae vel ut.",
    targetAmount: 2000000,
    amountRaised: 1200000,
    postedOn: "2024-03-02",
    endsOn: "2024-08-02",
    investors: [{ name: 'Investor1', amount: 500000 }, { name: 'Investor 2', amount: 700000 }],
    updates: [{ date: '2024-04-14', comment: "Lorem ipsum dolor sit amet," }, { date: '2024-04-16', comment: "Lorem ipsum dolor sit amet," }],
    images: ["https://s3-ap-south-1.amazonaws.com/static.awfis.com/wp-content/uploads/2017/07/07184649/ProjectManagement.jpg", "https://www.celoxis.com/cassets/img/pmc/project-management.png", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCgn3Ii53eAxizXRbyO3R8Mlf-npKMr5G-_ycjbFrICg&s", "https://www4.instagantt.com/assets/63c5e29f1b5bc83fe0af2489/6424d753f8eb7a9e69c372fc_Gantt%20Chart%20Online%20Software%20Instagantt%20Ideation%202.webp"],
    videos: [video1, video2, video3]
  }
  const navObj = [{ text: 'Home', link: '/' }, { text: 'Projects', link: '/innovator/projects' }, { text: 'Messages', link: '' }]
  return (
    <>
      <div className='sticky-top'><Header navObj={navObj} /></div>

      <div className='main-div'>
      <div className='text-start'>
            <Link to={'/investor/projects'}>
              <Button variant="outline-dark rounded-0 " className='ms-auto'><i className="fa-solid fa-arrow-left"></i> Back</Button>
            </Link>
          </div>
        <Container fluid={'sm'} className='p-3 text-center'>
          <img className='img-fluid mb-3' src={project?.coverImage} alt="" style={{ height: '400px' }} />
          <h1>Project Name</h1>
          <p style={{ textAlign: 'justify' }} className=' mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore id sapiente minima dolore possimus modi tempora illum eius ipsam eaque ducimus est ea laudantium explicabo commodi alias, exercitationem necessitatibus sequi.
            Placeat assumenda animi at dignissimos velit labore quia! Pariatur, tempora possimus! Quis tempora quae ex nobis quas nostrum dolorem, quam voluptate eligendi labore laboriosam temporibus expedita sunt delectus. Beatae, facere!
            Exercitationem facere voluptatem commodi eius libero animi nulla tenetur, adipisci itaque eveniet, sed impedit mollitia at cumque dignissimos nesciunt accusamus rem quidem omnis distinctio enim velit obcaecati deserunt quam? Impedit.</p>
          <div className='w-75 mx-auto my-2'>
            <h3>Amount raised</h3>
            <ProgressBar variant='success' className='striped' now={(project.amountRaised / project.targetAmount) * 100} label={`₹${project.amountRaised}`} title={`₹${project.amountRaised} / ₹${project.targetAmount}`} style={{ height: '30px' }} data-bs-theme='dark' />
            <div className='d-flex justify-content-between mb-3'>
              <p>Deadline: {project.endsOn}</p>
              <p>Target Amount : <b>₹{project.targetAmount}</b></p>
            </div>
          </div>
          <h3>Investors</h3>
          <ListGroup className='w-75 mx-auto fw-bold  mb-5'>
            {project.investors?.map((i, index) =>
              <ListGroup.Item className='bg-transparent d-flex justify-content-evenly' key={index}>{i.name} <span className='vr mx-4'></span> ₹{i.amount}</ListGroup.Item>)}

          </ListGroup>
          {project.images?.length > 0 &&
            <>
              <h3>Images</h3>
              <div class="scroll-container mb-5">
                {project.images.map((i, index) => <img src={i} alt={`image-${index}`} key={index} height={250} />)}
              </div>
            </>
          }
          {project.videos?.length > 0 &&
            <>
              <h3>Videos</h3>
              <div class="scroll-container">
                {project.videos.map((i, index) =>
                  <video controls height={250}>
                    <source src={i} type="video/mp4" />
                    <source src={i} type="video/webm" />
                    <source src={i} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>)}
              </div>
            </>
          }

        </Container>
      </div>

    </>

  )
}

export default InvestorProjectView