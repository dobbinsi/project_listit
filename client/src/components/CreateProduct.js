import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Form from "./Form";


const CreateProduct = (props) => {
    const [errors, setErrors] = useState({});
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();
    const [newProduct, setNewProduct] = useState({
        title: "",
        image: "",
        description: "",
        condition: "",
        categories: "",
        price: "",
        location: "",
    });

    const createSubmitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/products`, newProduct,
            { withCredentials: true })
            .then((res) => {
                navigate("/products/home");
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
                    <h1>New Listing</h1>
                    <Form
                        submitHandler={createSubmitHandler}
                        product={newProduct}
                        setProduct={setNewProduct}
                        errors={errors}
                        buttonText={"Listit!"}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateProduct;

