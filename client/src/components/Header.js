import React from 'react';
import axios from "axios";
import logo from "../images/cart_logo.jpg";
import { Link, navigate } from "@reach/router";

const Header = (props) => {
    const { linkOne, textOne, linkTwo, textTwo, linkThree, textThree, linkFour, textFour } = props;

    const logout = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/logout",
            {},
            {
                withCredentials: true,
            },
        )
            .then((res) => {
                localStorage.removeItem("userId");
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="header-main">
            <div className="brand-logo">
                <img src={logo} className='cart-logo' alt='cart-logo' />
                <h1>Project Listit</h1>
            </div>
            <div>
                <div className="navbar">
                    <Link to={linkOne} className="nav-links">{textOne}</Link>
                    <Link to={linkTwo} className="nav-links">{textTwo}</Link>
                    <Link to={linkThree} className="nav-links">{textThree}</Link>
                    <Link to={linkFour} className="nav-links" onClick={logout} >{textFour}</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;

