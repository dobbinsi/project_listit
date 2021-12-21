require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();


//file uploader I have this commented out since I was not able to have it communicate with frontend 

// const multer = require("multer");


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public')
//     },
//     //Date.now is timestamp  - originalName gives us unique names
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// });

// const upload = multer({storage}).array('file');

// app.post('/upload', (req, res) => {
//     upload(req, res, (err) => {
//         if (err) {
//             return res.status(400).json(err)
//         }

//         return res.status(200).send(req.files)
//     })
// });

// app.use(express.static('public'));
// //file uploader ends line 36

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        credentials: true, 
        origin: "http://localhost:3000",
    }),
);


app.use(cookieParser());

require("./config/mongoose.config");
// adding routes to listen
require("./routes/user.routes")(app);
require("./routes/product.routes")(app);

app.listen(8000, () => console.log("you are connected at port 8000"));
