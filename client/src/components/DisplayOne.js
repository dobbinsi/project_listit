import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import Header from "./Header";

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

    return (
        <div>
            <Header 
            linkOne={"/products/home"}
            textOne={"Browse Items"}
            linkTwo={`/users/${userId}`}
            textTwo={"My Products"}
            linkThree={"/products/new"}
            textThree={"New Listing"}
            linkFour={"/"}
            textFour={"Log Out"}
            />
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
                                {
                                    oneProduct.createdBy === userId ?
                                        <div>
                                            <Link to={`/product/edit/${oneProduct._id}`}><button className="product-buttons">Edit Product</button></Link>
                                            <button className="product-buttons" onClick={deleteHandler}>Remove Listing</button>
                                        </div>
                                        : <div>
                                            <a href={`mailto:${oneProduct.createdBy?.email}`}><button className="product-buttons">Contact Seller</button></a>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default DisplayOne;

