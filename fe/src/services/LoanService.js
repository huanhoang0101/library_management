import axios from "axios"

const endpoint = process.env.REACT_APP_BACKEND_URL;

const getAllLoansService = () => {
    return axios.get(`${endpoint}/api/get-all-loans`);
}

const createNewLoanService = (data) => {
    return axios.post(`${endpoint}/api/create-new-loan`, data)
}

const updateLoanReturnDayService = (data) => {
    return axios.put(`${endpoint}/api/update-loan`, data)
}

export {
    getAllLoansService,
    createNewLoanService,
    updateLoanReturnDayService,
}