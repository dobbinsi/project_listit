import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import logo from "../images/cart_logo.jpg";

const DisplayOne = (props) => {
    const { id } = props;
    const [oneProduct, setOneProduct] = useState({});
    const [userId, setUserId] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setOneProduct(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        setUserId(localStorage.getItem("userId"));
        console.log(localStorage.getItem("userId"));
    }, []);

    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/product/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/products/home");
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
                    <div className="product-container-big">
                        <div className="product-details-big">
                            <h1>{oneProduct.title}</h1>
                            <img src={oneProduct.image} alt="product image" />
                            <h2>Price:</h2>
                            <h2>${oneProduct.price}</h2>
                            <div className="detail-description">
                                <h3>Product Description:</h3>
                                <p>{oneProduct.description}</p>
                                <h3 className="condition">Condition:</h3>
                                <p>{oneProduct.condition}</p>
                            </div>
                            <div>
                            <Link to={`/product/edit/${oneProduct._id}`}><button className="product-buttons">Edit Product</button></Link>
                                <button className="product-buttons" onClick={deleteHandler}>Remove Listing</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default DisplayOne;

