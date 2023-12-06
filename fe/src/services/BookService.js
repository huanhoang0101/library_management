import axios from "axios"

const endpoint = "http://localhost:8080";

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

export {
    getAllBooksService,
    createNewBookService,
    editBookService,
    deleteBookService,
}