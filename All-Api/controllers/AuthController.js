const UserModel = require('../models/UserModel');

const jwt = require('jsonwebtoken');


//Register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({
                success: true,
                message: 'Please fill in all fields'
            });
        }
        const dup = await UserModel.findOne({ email: email });
        if (dup) {
            return res.status(200).send({
                success: false,
                message: "User is already exists",
            })
        }
        const user = await UserModel.create({
            name: name,
            email: email,
            password: password
        })
        return res.status(200).send({
            success: true,
            message: "User registered successfully",
            user
        })
    } catch (err) {
        return res.status(501).send({
            err: err
        })
    }
}


//Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).send({
                success: false,
                message: "All field is required"
            })
        }
        const user = await UserModel.findOne({ email: email });
        if (!user || user.password != password) {
            return res.status(200).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        const token = await jwt.sign({ payload: user }, "all-api", { expiresIn: '24hr' });
        return res.status(200).send({
            success: true,
            message: "Token Here",
            token
        })
    } catch (err) {
        return res.status(501).send({
            err: err
        })
    }
}


//Users
const users = async (req, res) => {
    try {
        const users = await UserModel.find();
        return res.status(200).send({
            success: true,
            message: "User successfully fetch",
            LoginUserName: req.user.name
        })
    } catch (err) {
        return res.status(501).send({
            err: err
        })
    }
}


//Changepassword
const changepassword = async (req, res) => {
    try {
        const { email, newpassword, confirmpassword } = req.body;
        let checkuser = await UserModel.findOne({ email: email });
        if (!checkuser) {
            return res.status(200).send({
                success: false,
                message: "User not found",
            });
        }
        if (newpassword !== confirmpassword) {
            return res.status(200).send({
                success: false,
                message: "New password and confirm password do not match",
            });
        }
        const updatedUser = await UserModel.findByIdAndUpdate(
            checkuser._id,
            { password: newpassword },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(200).send({
                success: false,
                message: "Error updating password",
            });
        }

        return res.status(200).send({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};


module.exports = {
    register, login, users, changepassword
}