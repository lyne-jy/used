import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav} from "react-bootstrap";
import { getUser } from "../services/accountService";

const NavBar = () => {
    const user = getUser();
    return (
        <Navbar>
            <Nav.Link as={Link} to="/">Used</Nav.Link>
            <span className="m-auto"/>
            <div>{user ? ("Hello, " + user.name) : "Sign in to post ads."}</div>
            <Nav.Link as={Link} to="/" style={{marginLeft: "5%"}}>Browse</Nav.Link>
            {!user && <Nav.Link as={Link} to="/login">Login/Register</Nav.Link>}
            {user && <Nav.Link as={Link} to="/sell">Sell</Nav.Link>}
            {user && <Nav.Link as={Link} to="/my-items">My Items</Nav.Link>}
            {user && <Nav.Link as={Link} to="/logout">Logout</Nav.Link>}
        </Navbar>
    );
};

export default NavBar;