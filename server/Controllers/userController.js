const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({ id }, jwtkey, { expiresIn: "3d" });
}

const registerUser = async (request, response) => {
    try {
        const { name, email, password } = request.body;

        let user = await userModel.findOne({ email });

        if (user) {
            return response.status(400).json("User with the given email already exists");
        }

        if (!name || !email || !password) {
            return response.status(400).json("All fields are required");
        }

        if (!validator.isEmail(email)) {
            return response.status(400).json("Email is not valid");
        }

        if (!validator.isStrongPassword(password)) {
            return response.status(400).json("Password is not strong enough");
        }

        const salt = await bcrypt.getSalt(10);
        const userPassword = await bcrypt.hash(password, salt);
        user = await userModel.create({ name, email, userPassword });

        const token = createToken(user._id);

        response.status(200).json({ _id: user._id, name, email, token });
    } catch (error) {
        console.error(error);
        return response.status(500).json("Server error! please contact the server admin.");
    }
}

const loginUser = async (request, response) => {
    const { email, password } = request.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return response.status(400).json("Invalid email or password");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return response.status(400).json("Invalid email or password");
        }

        const token = createToken(user._id);

        response.status(200).json({_id: user._id, name: user.name, email, token})

    } catch (error) {
        console.log(error);
        return response.status(500).json("Server error! please contact the server admin.");
    }
}

const findUser = async(request, response) => {
    const userId = request.params.userId;
    try {
        const user = await userModel.findById(userId);

        response.status(200).json(user);
    } catch(error) {
        console.log(error);
        return response.status(500).json("Server error! please contact the server admin.");
    }
}

module.exports = { registerUser, loginUser, findUser }