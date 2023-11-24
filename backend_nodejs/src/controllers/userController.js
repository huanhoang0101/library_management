import { json } from 'body-parser';
import userService from '../services/userService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    //check email exists
    //check password
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'missing input parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let users = await userService.getAllUsers();

    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        users,
    })
}

let handleGetUserById = async (req, res) => {
    let userId = req.query.id;
    if (!userId) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameter',
            user: []
        })
    }

    let user = await userService.getUserById(userId);

    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        user
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);

    return res.status(200).json(message);
}

let handleUpdateUser = async (req, res) => {
    let data = req.body;
    if (!data) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter"
        })
    }
    let message = await userService.updateUser(data);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    let userId = req.body.id;
    if (!userId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter"
        })
    }
    let message = await userService.deleteUser(userId);
    return res.status(200).json(message);
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleGetUserById: handleGetUserById,
    handleCreateNewUser: handleCreateNewUser,
    handleUpdateUser: handleUpdateUser,
    handleDeleteUser: handleDeleteUser
}