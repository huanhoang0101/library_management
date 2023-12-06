import db from '../models/index';

let getAllBooks = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let books = await db.Books.findAll();

            resolve(books);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewBook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await getBookByTitle(data.title);
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: 'This book already exists'
                })
            } else {
                await db.Books.create({
                    title: data.title,
                    //publication_date: data.laspublication_datetName,
                    publication_date: data.publication_date,
                    copies_owner: data.copies_owner,
                    image: data.image,
                    //image: "https://yurri2301.files.wordpress.com/2017/02/minna-no-nihongo-ii-topikku.jpg",
                    description: data.description,
                    author: data.author,
                    category_id: data.category_id
                })

                resolve({
                    errCode: 0,
                    message: 'OK'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateBook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            let book = await db.Books.findOne({
                where: { id: data.id },
                raw: false
            });

            if (book) {
                book.title = data.title;
                //book.publication_date = data.publication_date;
                book.copies_owner = data.copies_owner;
                //book.image = data.image;
                book.description = data.description;
                book.author = data.author;
                book.category_id = data.category_id;

                await book.save();

                resolve({
                    errCode: 0,
                    message: 'Update book success'
                });
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "Book not found"
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

let deleteBook = (bookId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let book = await findBookById(bookId)

            if (book) {
                await db.Books.destroy({
                    where: { id: bookId }
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Book is deleted'
                })
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "This book isn't exist"
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let findBookById = (bookId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let book = await db.Books.findOne({
                where: { id: bookId }
            })

            resolve(book)
        } catch (e) {
            reject(e);
        }
    })
}

let getBookByTitle = (bookTitle) => {
    return new Promise(async (resolve, reject) => {
        try {
            let book = await db.Books.findOne({
                where: { title: bookTitle }
            })

            resolve(book);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllBooks: getAllBooks,
    createNewBook: createNewBook,
    updateBook: updateBook,
    deleteBook: deleteBook,
}