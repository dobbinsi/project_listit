const  mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "A product name is required!"],
            minLength: [ 3, "Product name must be at least 3 characters long", ],
        },

        image: {
            type: String,
        },

        description: {
            type: String,
        },

        price: {
            type: Number,
            required: [true, "Please set a price"],
            min: [0, "Price cannot be negative. Give it away for free!"]
        },

        condition:{
            type: String,
            required: [true, "Please select one below"],
            enum:[
                "New",
                "Used(normal wear)",
                "For parts",
                "Other(see description)",
            ]
        },

        categories: {
            type: String,
            required: [true, "Please select one below!"],
            enum: [
                "Electronics/Media",
                "Home/Garden",
                "Clothing",
                "Shoes",
                "Vehicles",
                "Toys/Games/Hobbies",
                "Sports/Outdoors",
                "Pet Supplies",
                "General",
                "Collectibles/Art",
                "Business Equipment",
            ],
        },




        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true },
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;


