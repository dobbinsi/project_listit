import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import logo from "../images/cart_logo.jpg";

const DisplayOne = (props) => {
    const { id } = props;
    const [product, setProduct] = useState([]);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setProduct(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        setUserId(localStorage.getItem("userId"));
        console.log(localStorage.getItem("userId"));
    }, []);

    // const deleteProduct = (idFromBelow) => {
    //     axios.delete(`http://localhost:8000/api/products/${idFromBelow}`)
    //         .then((res) => {
    //             console.log(res.data);
    //             const newList = productList.filter((product, index) => product._id !== idFromBelow);
    //             setProductList(newList);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // };

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
            <div className="">
                helloooooooo
                {
                    <h1>{product.title}</h1>
                }
            </div>
        </div>
    )
}

export default DisplayOne;

