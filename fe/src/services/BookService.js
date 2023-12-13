import axios from "axios"

const endpoint = process.env.REACT_APP_BACKEND_URL;

const getAllBooksService = () => {
    return axios.get(`${endpoint}/api/get-all-books`);
}

const createNewBookService = (data) => {
    return axios.post(`${endpoint}/api/create-new-book`, data)
}

const deleteBookService = (bookId) => {
    return axios.delete(`${endpoint}/api/delete-book`, {
        data: {
            id: bookId
        }
    });
}

const editBookService = (data) => {
    return axios.put(`${endpoint}/api/update-book`, data)
}

const getBookByIdService = (bookId) => {
    return axios.post(`${endpoint}/api/get-book-by-id`, { id: bookId });
}

export {
    getAllBooksService,
    createNewBookService,
    editBookService,
    deleteBookService,
    getBookByIdService
}