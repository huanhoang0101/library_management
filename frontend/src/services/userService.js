import axios from "../axios"

const handleLoginService = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsersService = (userId) => {
    return axios.get(`/api/get-all-users?id=${userId}`);
}

const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`, data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const editUserService = (data) => {
    return axios.put('/api/update-user', data)
}

export {
    handleLoginService,
    getAllUsersService,
    createNewUserService,
    editUserService,
    deleteUserService,
}