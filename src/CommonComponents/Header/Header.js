import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/logo-black.png";
import { Badge } from "react-bootstrap";
import Notifications from "../Notifications/Notifications";
import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";




function Header({ navObj }) {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate=useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [isLogin, setIsLogin] = useState(false);

  const login = () => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
  };

  const logOut = () => {
    setIsLogin(false)
    localStorage.removeItem("token")
   navigate("/")
  };

  useEffect(() => {
    login();
  }, []);
  return (
    <Navbar
      expand="md"
      className="bg-body-light header shadow-sm sticky-top"
      style={{ minHeight: "80px", backgroundColor: "white" }}
    >
      <Container fluid className="">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Navbar.Brand className="ms-lg-4 ms-md-3 d-flex">
            <img className="logo-img" src={logo} alt="" />{" "}
            <h2 className="mt-2 ms-3">
              <b>
                {" "}
                <span>
                  {" "}
                  Capital<span className="head2">Clue</span>
                </span>
              </b>
            </h2>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle className="me-3" />
        <Navbar.Collapse>
          <Nav className="mx-auto my-2 my-lg-0 text-end">
            {navObj?.map((i, index) => (
              <Link to={i.link} style={{ textDecoration: "none" }} key={index}>
                <h6
                  className={
                    i.active
                      ? "me-lg-5 me-3 active navlink"
                      : "me-lg-5 me-3 navlink"
                  }
                >
                  {i.text}
                  {i.badge && (
                    <sup>
                      <Badge>{i.badge}</Badge>
                    </sup>
                  )}
                </h6>
              </Link>
            ))}
          </Nav>
          <Nav>

          {isLogin&&<Box sx={{ flexGrow: 0 }} className="me-3">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
           <MenuItem  onClick={handleCloseUserMenu}>
                 <Link to={'/profile'} style={{textDecoration:'none',color:'black'}}> <Typography textAlign="center">Profile</Typography></Link>
                </MenuItem>
                <MenuItem  onClick={handleCloseUserMenu}>
               <div onClick={logOut}>   <Typography textAlign="center" >LogOut</Typography></div>
                </MenuItem>
            </Menu>
          </Box>}
           
          </Nav>
          <Notifications />

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
