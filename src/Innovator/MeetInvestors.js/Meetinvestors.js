import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { endpoints } from "../../services/defaults";
import useApi from "../../hooks/useApi";
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Header from "../../CommonComponents/Header/Header";

function Meetinvestors() {
  const navObj = [
    { text: "Dashboard", link: "/innovator/home" },
    { text: "My Projects", link: "/innovator/projects" },
    { text: "Messages", link: "/innovator/messages" },
  ];

  const { request: getInvestors } = useApi("get");
  const [investorList, setInvestorList] = useState([]);
  console.log(investorList);
  const getAllInvestors = async () => {
    try {
      let url = `${endpoints.GET_ALL_INVESTORS}`;
      let apiResponse = await getInvestors(url);
      const { response, error } = apiResponse;
      if (!error && response) {
        setInvestorList(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllInvestors();
  }, []);

  return (
    <div>
      <Header navObj={navObj} />
      <Container className="text-center">
        <h3 className="pt-5">Meet The Investors</h3>
        <div className="pb-5 d-flex justify-content-around">
          <div>
            {investorList?.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th className="px-5">Investor Id</th>
                    <th className="px-5">Name</th>
                    <th className="px-5">Links</th>
                  </tr>
                </thead>
                <tbody>
                  {investorList.map((item, index) => (
                    <tr key={index}>
                      <td c>{item.id}</td>
                      <td className="px-5">{item.username}</td>
                      <Link to={`/innovator/InvestorProfile/${item.id}`}>
                        <td className="px-5">
                          More Info <FaArrowAltCircleRight />
                        </td>
                      </Link>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-danger text-center">
                <b>No Projects Available....!</b>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Meetinvestors;
