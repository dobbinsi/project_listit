const ProductController = require("../controllers/product.controller");

const { authenticate } = require("../config/jwt.config");


module.exports = (app) =>{

app.get("/api/products", ProductController.findAllProducts);

app.post("/api/products", authenticate, ProductController.createNewProduct);

app.get("/api/product/:id", ProductController.findOneProduct);

app.put("/api/product/:id", ProductController.updateProduct);

app.delete("/api/product/:id", ProductController.deleteProduct);

app.get("/api/user/products/:userId", ProductController.findAllProductsByUser,);

}

