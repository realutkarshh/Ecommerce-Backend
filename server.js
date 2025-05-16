const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//Authentication routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

//Product routes
const productRoute = require("./routes/product");
app.use("/api/products", productRoute);


app.get("/", (req,res) => {
    res.send("Welcome to the Ecommerce API");
});

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server is running on port:",process.env.PORT || 5000);
    });
})
.catch((err) => {
    console.error("DB connection error",err);
});
