import axios from "axios"

const endpoint = "http://localhost:8080";

const handleLoginService = (userEmail, userPassword) => {
    return axios.post('http://localhost:8080/api/login', { email: userEmail, password: userPassword });
}

const getAllUsersService = (userId) => {
    return axios.get(`${endpoint}/api/get-all-users?id=${userId}`);
}

const createNewUserService = (data) => {
    return axios.post(`http://localhost:8080/api/create-new-user`, data)
}

const deleteUserService = (userId) => {
    return axios.delete('http://localhost:8080/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const editUserService = (data) => {
    return axios.put('http://localhost:8080/api/update-user', data)
}

export {
    handleLoginService,
    getAllUsersService,
    createNewUserService,
    editUserService,
    deleteUserService,
}