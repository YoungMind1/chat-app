const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
    response.send("Welcome to our chat app APIs. ...");
})
const port = process.env.PORT || 3000;

app.listen(port, (request, response) => {
    console.log(`Server running on port ${port}`);
})

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connection established");
}).catch((error) => {
    console.log("MongoDB connection failed: ", error.message);
});