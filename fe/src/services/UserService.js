import axios from "axios"

const endpoint = process.env.REACT_APP_BACKEND_URL;

const handleLoginService = (userEmail, userPassword) => {
    return axios.post(`${endpoint}/api/login`, { email: userEmail, password: userPassword });
}

const getAllUsersService = (userId) => {
    return axios.get(`${endpoint}/api/get-all-users?id=${userId}`);
}

const createNewUserService = (data) => {
    return axios.post(`${endpoint}/api/create-new-user`, data)
}

const deleteUserService = (userId) => {
    return axios.delete(`${endpoint}/api/delete-user`, {
        data: {
            id: userId
        }
    });
}

const editUserService = (data) => {
    return axios.put(`${endpoint}/api/update-user`, data)
}

const getUserByIdService = (userId) => {
    return axios.get(`${endpoint}/api/get-user-by-id?id=${userId}`)
}

export {
    handleLoginService,
    getAllUsersService,
    createNewUserService,
    editUserService,
    deleteUserService,
    getUserByIdService,
}