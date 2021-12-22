import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import logo from "../images/cart_logo.jpg";

const Profile = (props) => {
    const { userId } = props;
    const [userProductList, setUserProductList] = useState([]);
    const [oneUser, setOneUser] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/products/${userId}`)
            .then((res) => {
                console.log(res.data);
                setUserProductList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${userId}`)
            .then((res) => {
                console.log(res.data);
                setOneUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const deleteProduct = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/products/${idFromBelow}`)
            .then((res) => {
                console.log(res.data);
                const newList = userProductList.filter((product, index) => product._id !== idFromBelow);
                setUserProductList(newList);
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
                        <Link to={`/users/${userId}`} className="nav-links">My Products</Link>
                        <Link to={"/products/new"} className="nav-links">New Listing</Link>
                        <Link to={"/"} className="nav-links" onClick={logout} >Log Out</Link>
                    </div>
                </div>
            </div>
            <div className="body-main-market">
                {/* <h1>{oneUser.username}'s Listings</h1> */}
                {
                    userProductList.map((product, index) => (
                        <div key={index}>
                            <div className="product-container">
                                <div className="product-details">
                                    <Link to={`/product/${product._id}`} className="product-links">
                                        <img src={product.image} alt="product image" className="thumbnail" />
                                        <h2>{product.title}</h2>
                                    </Link>
                                    <h3>{product.categories}</h3>
                                    <h3>Price: ${product.price}</h3>
                                    <Link to={`/product/${product._id}`}><button className="product-buttons">View Product</button></Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Profile;




