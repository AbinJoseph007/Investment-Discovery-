import React, { useEffect, useState } from "react";
import "./InnovatorMessages.css";
import { Form, useSearchParams } from "react-router-dom";
import {
  Button,
  Container,
  InputGroup,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import Header from "../../CommonComponents/Header/Header";
function InnovatorMessages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState("");
  const [displayMessages, setDisplayMessages] = useState([]);
  const [msgLoading, setMsgLoading] = useState(true);
  const [dMsgLoading, setDMsgLoading] = useState(true);

  useEffect(() => {
    if (searchParams) {
      setId(searchParams.get("id"));
    }
  }, [searchParams]);
  useEffect(() => {
    if (id) {
      setDisplayMessages(messages.filter((i) => i.user == id));
    } else {
      setDisplayMessages([]);
    }
    setDMsgLoading(false);
  }, [id]);
  const users = [
    { id: 1, name: "Investor1" },
    { id: 2, name: "Investor2" },
    { id: 3, name: "Rich Investor1" },
  ];
  // const users=[]
  const messages = [
    { id: 1, type: "received", user: 3, content: "Hello1" },
    { id: 2, type: "received", user: 1, content: "Hello2" },
    { id: 3, type: "received", user: 2, content: "Hello3" },
    { id: 4, type: "sent", user: 3, content: "Hello4" },
    { id: 5, type: "received", user: 2, content: "Hello5" },
    { id: 6, type: "sent", user: 3, content: "Hello6" },
    {
      id: 7,
      type: "received",
      user: 2,
      content:
        "Longer message.Longer messageLonger messageLonger message.Longer message",
    },
    {
      id: 8,
      type: "sent",
      user: 2,
      content:
        "Longer message.Longer messageLonger messageLonger message.Longer message. Longer message.Longer messageLonger messageLonger message.Longer messageLonger message.Longer messageLonger messageLonger message.Longer messageLonger message.Longer messageLonger messageLonger message.Longer message",
    },
    { id: 9, type: "sent", user: 3, content: "Hello7" },
    { id: 10, type: "sent", user: 3, content: "Hello8" },
    { id: 11, type: "sent", user: 3, content: "Hello9" },
    { id: 12, type: "sent", user: 3, content: "Hello10" },
    { id: 13, type: "sent", user: 3, content: "Hello11" },
    { id: 14, type: "sent", user: 3, content: "Hello12" },
  ];
  console.log(id);
  const handleSelectUser = (id) => {
    setSearchParams({ id });
  };

  const rendAvat = (l, id) => {
    const randomDarkColor = () => {
      const colorList = [
        "#8B4513",
        "#8B0000",
        "#CD853F",
        "#A0522D",
        "#B8860B",
        "#556B2F",
        "#2F4F4F",
        "#483D8B",
        "#228B22",
        "#4B0082",
        "#800000",
        "#8B008B",
        "#556B2F",
        "#556B2F",
        "#6B8E23",
        "#2F4F4F",
        "#483D8B",
        "#8B4513",
        "#8B0000",
        "#CD853F",
        "#A0522D",
        "#B8860B",
        "#556B2F",
        "#2F4F4F",
        "#483D8B",
        "#228B22",
        "#4B0082",
        "#800000",
        "#8B008B",
        "#556B2F",
        "#556B2F",
        "#6B8E23",
        "#2F4F4F",
        "#483D8B",
        "#8B4513",
        "#8B0000",
        "#CD853F",
        "#A0522D",
        "#B8860B",
        "#556B2F",
        "#2F4F4F",
        "#483D8B",
        "#228B22",
        "#4B0082",
        "#800000",
        "#8B008B",
        "#556B2F",
        "#556B2F",
        "#6B8E23",
        "#2F4F4F",
        "#483D8B",
      ];
      return colorList[parseInt(id) % colorList.length];
    };
    const newRandomColor = randomDarkColor();
    return (
      <div
        className="d-flex justify-content-center align-items-center fs-4 fw-bold me-2 rounded-5 p-3"
        style={{
          backgroundColor: newRandomColor,
          height: "30px",
          width: "30px",
        }}
      >
        {l[0]}
      </div>
    );
  };
  return (
    <>
      <div className="sticky-top">
        <Header />
      </div>
      <>
        <div className="msg-grid  bg-dark border  border-dark ">
          <div className="msg-left bg-dark my-3 me-1">
            <h3 className="text-light ps-2">Contacts</h3>
            {users?.length > 0 ? (
              <ListGroup data-bs-theme="dark" className="rounded-0">
                {users.map((i) => (
                  <ListGroup.Item
                    action
                    active={id && i.id == id && "active"}
                    className="border-0 px-lg-1 rounded"
                    variant="flush"
                    key={i.id}
                    onClick={() => handleSelectUser(i.id)}
                  >
                    <div className="d-flex align-items-center my-auto">
                      {rendAvat(i.name, i.id)}
                      <div className="">{i.name}</div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p className="text-secondary">
                {" "}
                You have no contacts! Visit investor's profile to message them.
              </p>
            )}
          </div>
          <div className="msg-right bg-light" style={{ position: "relative" }}>
            <div>
              {id ? (
                dMsgLoading ? (
                  <div className="w-100 text-center py-5">
                    <Spinner animation="grow" size="lg" />
                  </div>
                ) : displayMessages.length > 0 ? (
                  <div className="msg-container p-3">
                    {displayMessages.map((i) => (
                      <div key={i.id} className={`msg-outer-box ${i.type}`}>
                        <p className="sender text-secondary mb-0">
                          {i.type == "received"
                            ? users.find((j) => j.id == i.user).name
                            : "You"}
                        </p>
                        <div className="msg-box py-2 px-3 border border-black rounded-4 mb-3 mt-0">
                          {i.content}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-secondary p-5 text-center">
                    You have no message history with this user. Say something to
                    start conversation.
                  </p>
                )
              ) : (
                <p className="text-secondary p-5 text-center">
                  Select a user to send messages
                </p>
              )}
            </div>

            <div className="msg-input-box w-100">
              <InputGroup className="rounded-4">
                <textarea
                  className="form-control msg-input  border border-black"
                  placeholder="Type your message here..."
                />
                <Button variant="dark" className="px-4">
                  <i className="fa-regular fa-paper-plane fa-xl"></i>
                </Button>
              </InputGroup>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default InnovatorMessages;
