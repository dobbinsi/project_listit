import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import logo from "../images/cart_logo.jpg";


const EditProduct = (props) => {
    const { id } = props;
    const [errors, setErrors] = useState({});
    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [condition, setCondition] = useState("");
    const [categories, setCategories] = useState("");
    const [price, setPrice] = useState("");
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/${id}`)
            .then((res) => {
                console.log(res.data);
                setTitle(res.data.title);
                setImage(res.data.image);
                setDescription(res.data.description);
                setCondition(res.data.condition);
                setCategories(res.data.categories);
                setPrice(res.data.price);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/product/${id}`,
            {
                title,
                image,
                description,
                condition,
                categories,
                price
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate(`/product/${id}`);
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
    useEffect(() => {
        setUserId(localStorage.getItem("userId", userId));
        console.log(localStorage.getItem("userId"));
    }, []);

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
                <div className="body-content-logreg">
                    <h1>Edit Product Details</h1>
                    <form onSubmit={submitHandler}>
                        <div className="logregform">
                            <label className="form-labels">Title:</label>
                            <input onChange={(e) => setTitle(e.target.value)} className="login-input" type="text" name="title" value={title} />
                            {
                                errors.title ?
                                    <span>{errors.title.message}</span>
                                    : null
                            }
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Image (URL):</label>
                            <input className="login-input" type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)} />
                            {
                                errors.image ?
                                    <span>{errors.image.message}</span>
                                    : null
                            }
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Description:</label>
                            <input className="login-input" type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            {
                                errors.description ?
                                    <span>{errors.description.message}</span>
                                    : null
                            }
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Category:</label>
                            <select className="login-input" name="categories" value={categories} onChange={(e) => setCategories(e.target.value)} >
                                <option value="none" defaultValue hidden>Select</option>
                                <option value="Electronics/Media">Electronics/Media</option>
                                <option value="Home/Garden">Home/Garden</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Vehicles">Vehicles</option>
                                <option value="Toys/Games/Hobbies">Toys/Games/Hobbies</option>
                                <option value="Sports/Outdoors">Sports/Outdoors</option>
                                <option value="Pet Supplies">Pet Supplies</option>
                                <option value="General">General</option>
                                <option value="Collectibles/Art">Collectibles/Art</option>
                                <option value="Business Equipment">Business Equipment</option>
                            </select>
                            {
                                errors.categories ?
                                    <span>{errors.categories.message}</span>
                                    : null
                            }
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Condition:</label>
                            <select className="login-input" name="condition" value={condition} onChange={(e) => setCondition(e.target.value)} >
                                <option value="none" defaultValue hidden>Select</option>
                                <option value="New">New</option>
                                <option value="Used (normal wear)">Used (normal wear)</option>
                                <option value="For parts">For parts</option>
                                <option value="Other (see description)">Other (see description)</option>
                            </select>
                            {
                                errors.condition ?
                                    <span>{errors.condition.message}</span>
                                    : null
                            }
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Price ($):</label>
                            <input className="login-input" type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                            {
                                errors.price ?
                                    <span>{errors.price.message}</span>
                                    : null
                            }
                        </div>
                        <div className="center-button">
                            <button class="hover-button" type="submit">Submit Changes!</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProduct;

