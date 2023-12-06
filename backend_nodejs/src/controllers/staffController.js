import { json } from 'body-parser';
import staffService from '../services/staffService';

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

    let staffData = await staffService.handleStaffLogin(email, password);
    return res.status(200).json({
        errCode: staffData.errCode,
        message: staffData.errMessage,
        staff: staffData.staff ? staffData.staff : {}
    })
}

let handleGetAllStaff = async (req, res) => {
    let staff = await staffService.getAllStaff();

    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        staff,
    })
}

let handleGetStaffById = async (req, res) => {
    let staffId = req.query.id;
    if (!staffId) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameter',
            staff: []
        })
    }

    let staff = await staffService.getStaffById(staffId);

    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        staff
    })
}

let handleCreateNewStaff = async (req, res) => {
    let message = await staffService.createNewStaff(req.body);

    return res.status(200).json(message);
}

let handleUpdateStaff = async (req, res) => {
    let data = req.body;
    if (!data) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter"
        })
    }
    let message = await staffService.updateStaff(data);
    return res.status(200).json(message);
}

let handleDeleteStaff = async (req, res) => {
    let staffId = req.body.id;
    if (!staffId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter"
        })
    }
    let message = await staffService.deleteStaff(staffId);
    return res.status(200).json(message);
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllStaff: handleGetAllStaff,
    handleGetStaffById: handleGetStaffById,
    handleCreateNewStaff: handleCreateNewStaff,
    handleUpdateStaff: handleUpdateStaff,
    handleDeleteStaff: handleDeleteStaff
}