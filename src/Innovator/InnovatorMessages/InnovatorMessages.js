import React, { useEffect, useRef, useState } from "react";
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
import { endpoints } from "../../services/defaults";
import useApi from "../../hooks/useApi";
import MessageBubble from "../../CommonComponents/MessageBubble/MessageBubble";


function InnovatorMessages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState("");
  const [displayMessages, setDisplayMessages] = useState([]);
  const [msgLoading, setMsgLoading] = useState(true);
  const [dMsgLoading, setDMsgLoading] = useState(true);
  const { request: getMessages } = useApi("get");
  const [reload, setReload] = useState(false)
  
  const [msg,setMsg] = useState([])
 
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
      scrollToBottom();
  }, [msg]);



  const mid=38

  const navObj = [
    { text: "Dashboard", link: "/investor/home" },
    { text: "My Projects", link: "/investor/projects" },
    { text: "Payments", link: "/investor/payments" },
    { text: "Messages", link: "/innovator/messages" },
  ];

  useEffect(() => {
    if (searchParams) {
      setId(searchParams.get("id"));
    }
  }, [searchParams]);
  // useEffect(() => {
  //   if (id) {
  //     setDisplayMessages(messages.filter((i) => i.user == id));
  //   } else {
  //     setDisplayMessages([]);
  //   }
  //   setDMsgLoading(false);
  // }, [id]);

  const users = [
    { id: 1, name: "Investor1" },
    { id: 2, name: "Investor2" },
    { id: 3, name: "Rich Investor1" },
  ];

  const getMessage = async () => {
    try {

      const url = `${endpoints.GET_CHAT_HISTORY}${mid}`;
      const { response, error } = await getMessages(url);
      console.log(response.data);
      
      if (!error && response.data) {
       const messages = response.data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        setMsg(messages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessage()
    setReload(false)
  },[reload])

  console.log('msg',msg);

  // const users=[]
  // const messages = [
  //   { id: 1, type: "received", user: 3, content: "Hello1" },
  //   { id: 2, type: "received", user: 1, content: "Hello2" },
  //   { id: 3, type: "received", user: 2, content: "Hello3" },
  //   { id: 4, type: "sent", user: 3, content: "Hello4" },
  //   { id: 5, type: "received", user: 2, content: "Hello5" },
  //   { id: 6, type: "sent", user: 3, content: "Hello6" },
  //   {
  //     id: 7,
  //     type: "received",
  //     user: 2,
  //     content:
  //       "Longer message.Longer messageLonger messageLonger message.Longer message",
  //   },
  //   {
  //     id: 8,
  //     type: "sent",
  //     user: 2,
  //     content:
  //       "Longer message.Longer messageLonger messageLonger message.Longer message. Longer message.Longer messageLonger messageLonger message.Longer messageLonger message.Longer messageLonger messageLonger message.Longer messageLonger message.Longer messageLonger messageLonger message.Longer message",
  //   },
  //   { id: 9, type: "sent", user: 3, content: "Hello7" },
  //   { id: 10, type: "sent", user: 3, content: "Hello8" },
  //   { id: 11, type: "sent", user: 3, content: "Hello9" },
  //   { id: 12, type: "sent", user: 3, content: "Hello10" },
  //   { id: 13, type: "sent", user: 3, content: "Hello11" },
  //   { id: 14, type: "sent", user: 3, content: "Hello12" },
  // ];
  // console.log(id);

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

  //SEND MESSAGE
  const [messageInput, setMessageInput] = useState("");
  const { request: sendMessage } = useApi("post");
  const ids = 38;
  const handleSendMessage = async () => {
    const payload = {
      message: messageInput,
    };
    try {
      const url = `${endpoints.SEND_MESSAGE}${ids}`;
      let messageResponse;
      messageResponse = await sendMessage(url, payload);
      let { response, error } = messageResponse;
      if (!error && response) {
        console.log("SENT");
        setMessageInput("");
        setReload(true)
      }
    } catch (error) {
      console.error(error);
    }
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
          <div className="msg-right bg-light" style={{ position: "relative", overflowY: "scroll"}}>
            {/* <div>
              {id ? (
                dMsgLoading ? (
                  <div className="w-100 text-center py-5">
                    <Spinner animation="grow" size="lg" />
                  </div>
                ) : msg.length > 0 ? (
                  <div className="msg-container p-3">
                    {msg.map((i) => (
                     <div>{i.message}</div> 
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
            </div> */}

            <div style={{ overflowY: "scroll"}} ref={scrollToBottom} >{msg?.length>0?msg.map((item) => (
              <MessageBubble message={item} own={item.receiver===mid} />
            )):"no data"}</div>
            

            <div className="msg-input-box w-100">
            <InputGroup className="rounded-4" style={{position:"sticky",bottom:0}}>
                <input
                  className="form-control msg-input  border border-black"
                  placeholder="Type your message here..."
                  value={messageInput}
                  onChange={(e) => {
                    setMessageInput(e.target.value);
                  }}
                />
                <Button
                  variant="dark"
                  className="px-4"
                  onClick={handleSendMessage}
                >
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
