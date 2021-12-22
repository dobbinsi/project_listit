import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import logo from "../images/cart_logo.jpg";

const DisplayAll = (props) => {
    const [productList, setProductList] = useState([]);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/api/products")
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setProductList(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        setUserId(localStorage.getItem("userId"));
        console.log(localStorage.getItem("userId"));
    }, []);

    const deleteProduct = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/listProducts/${idFromBelow}`)
            .then((res) => {
                console.log(res.data);
                const newList = productList.filter((product, index) => product._id !== idFromBelow);
                setProductList(newList);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const logout = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/logout",
            {},
            {
                withCredentials: true,
            },
        )
            .then((res) => {
                console.log(res.data);
                localStorage.removeItem("userId");
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <div className="header-main">
                <div className="brand-logo">
                    <img src={logo} className='cart-logo' />
                    <h1>Project Listit</h1>
                </div>
                <div>
                    <div className="navbar">
                        <Link to={"/products/home"} className="nav-links">Browse Items</Link>
                        <Link to={`/users/${userId}`} className="nav-links">My Profile</Link>
                        <Link to={"/products/new"} className="nav-links">New Listing</Link>
                        <Link to={"/"} className="nav-links" onClick={logout} >Log Out</Link>
                    </div>
                </div>
            </div>
            <div className="body-main">
                {
                    productList.map((product, index) => (
                        <div key={index}>
                            <div className="product-container">
                                <div className="product-details">
                                    <h2>{product.title}</h2>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DisplayAll;

