import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { NavLink as Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./Header";


const DisplayOne = () => {
    const { id } = useParams();
    const [oneProduct, setOneProduct] = useState({});
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();
    const jawn = process.env.REACT_APP_JAWN;
    // ^^ not secure but fine for this use case

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/${id}`)
            .then((res) => {
                setOneProduct(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    useEffect(() => {
        setUserId(localStorage.getItem("userId"));
    }, []);

    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/product/${id}`,
            { withCredentials: true })
            .then((res) => {
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
                            <img src={oneProduct.image} alt="product" />
                            <h2>Price:</h2>
                            <h2>${oneProduct.price}</h2>
                            <div className="detail-description">
                                <h3>Product Description:</h3>
                                <p>{oneProduct.description}</p>
                                <h3 className="condition">Condition:</h3>
                                <p>{oneProduct.condition}</p>
                                <h3>Location:</h3>
                                <iframe src={`https://www.google.com/maps/embed/v1/place?q=${oneProduct.location}&key=${jawn}`} title="map"></iframe>
                            </div>
                            <div>
                                {
                                    oneProduct.createdBy?._id === userId ?
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

