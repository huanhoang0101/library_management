import bookService from '../services/bookService';

let handleGetAllBooks = async (req, res) => {
    let books = await bookService.getAllBooks();

    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        books,
    })
}

let handleCreateNewBook = async (req, res) => {
    let message = await bookService.createNewBook(req.body);

    return res.status(200).json(message);
}

let handleUpdateBook = async (req, res) => {
    let data = req.body;
    if (!data) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter"
        })
    }
    let message = await bookService.updateBook(data);
    return res.status(200).json(message);
}

let handleDeleteBook = async (req, res) => {
    let bookId = req.body.id;
    if (!bookId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter"
        })
    }
    let message = await bookService.deleteBook(bookId);
    return res.status(200).json(message);
}

module.exports = {
    handleGetAllBooks: handleGetAllBooks,
    handleCreateNewBook: handleCreateNewBook,
    handleUpdateBook: handleUpdateBook,
    handleDeleteBook: handleDeleteBook
}