const Product = require("../models/product.model");
const jwt = require("jsonwebtoken");


module.exports = {

    findAllProducts: (req, res) =>{
        Product.find({})
            .populate("createdBy", "username _id")
            .then((allProducts)=>{
                console.log(allProducts);
                res.json(allProducts)
            })
            .catch((err)=>{
                console.log("Find all authors failed");
                res.json({message: "Something went wrong in findAllProducts", error: err})
            })
    },


    findAllProductsByUser: (req, res)=>{
        Product.find({ createdBy: req.params.userId})
        .then((allUserProducts)=>{
            console.log(allUserProducts);
            res.json(allUserProducts);
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })

    },

    findOneProduct: (req, res) =>{
        Product.findOne({_id: req.params.id})
            .then((oneProduct)=>{
                console.log(oneProduct);
                res.json(oneProduct)
            })
            .catch((err)=>{
                console.log("Failed to find one product");
                res.json({ message: 'Something went wrong in findOneProduct', error: err });
            })
    },


    //create new product with user login
    createNewProduct: (req, res) =>{
        const newProductObj = new Product(req.body);

        const decodedJWT = jwt.decode(req.cookies.usertoken,{
            complete: true
        })


        newProductObj.createdBy = decodedJWT.payload.id;

        newProductObj.save()
            .then((newProduct) => {
                console.log(newProduct);
                res.json(newProduct);
            })
            .catch((err) => {
                console.log("Something went wrong in createNewProduct");
                res.status(400).json(err);
            });
    },



    updateProduct: (req, res) =>{
        Product.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true, runValidators:true }
        )
            .then((updatedProduct)=>{
                console.log(updatedProduct);
                res.json(updatedProduct);
                
            })
            .catch((err)=>{
                res.status(400).json(err);
            })
    },


    deleteProduct: (req, res) =>{
        Product.deleteOne({_id: req.params.id})
            .then((deletedProduct)=>{
                console.log(deletedProduct);
                res.json(deletedProduct)
            })
            .catch((err)=>{
                console.log("Delete product failed");
                res.json({ message: 'Something went wrong in deleteProduct', error: err });
            })
    },

}

