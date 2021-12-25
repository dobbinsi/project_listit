import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@reach/router";
import Header from "./Header";

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
            {
                userProductList.length >= 1 ?
                    <div className="body-main-market">
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
                    : <div className="body-main-market">
                        <div className="nothing-listed">
                            <h1>You don't have any products listed for sale. List something and start earning today!</h1>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Profile;




