import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import Header from "./Header";
import Form from "./Form";

const EditProduct = (props) => {
    const { id } = props;
    const [errors, setErrors] = useState({});
    const [userId, setUserId] = useState("");
    const [updatedProduct, setUpdatedProduct] = useState({
        title: "",
        image: "",
        description: "",
        condition: "",
        categories: "",
        price: "",
        location: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/${id}`)
            .then((res) => {
                setUpdatedProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/product/${id}`, updatedProduct,
            { withCredentials: true })
            .then((res) => {
                navigate(`/product/${id}`);
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
    };

    useEffect(() => {
        setUserId(localStorage.getItem("userId", userId));
    }, []);

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
                <div className="body-content-logreg">
                    <h1>Edit Product Details</h1>
                    <Form
                        submitHandler={submitHandler}
                        product={updatedProduct}
                        setProduct={setUpdatedProduct}
                        errors={errors}
                        buttonText={"Submit Changes!"}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditProduct;

