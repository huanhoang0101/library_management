import axios from "axios"

const endpoint = "http://localhost:8080";

const handleLoginService = (staffEmail, staffPassword) => {
    return axios.post('http://localhost:8080/api/login', { email: staffEmail, password: staffPassword });
}

const getAllStaffService = (staffId) => {
    return axios.get(`${endpoint}/api/get-all-staff?id=${staffId}`);
}

const createNewStaffService = (data) => {
    return axios.post(`http://localhost:8080/api/create-new-staff`, data)
}

const deleteStaffService = (staffId) => {
    return axios.delete('http://localhost:8080/api/delete-staff', {
        data: {
            id: staffId
        }
    });
}

const editStaffService = (data) => {
    return axios.put('http://localhost:8080/api/update-staff', data)
}

export {
    handleLoginService,
    getAllStaffService,
    createNewStaffService,
    editStaffService,
    deleteStaffService,
}