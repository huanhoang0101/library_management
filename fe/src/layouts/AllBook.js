import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../scss/UserManage.scss';
import { getAllBooksService, createNewBookService, deleteBookService, editBookService } from '../services/BookService';
import ModalAddNewBook from '../modals/AddNewBookModal';
import ModalEditBook from '../modals/EditBookModal';
import { FaTrash, FaPencilAlt, FaPlus } from "react-icons/fa";

class BookManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrBooks: [],
            isOpenModalAddNewBook: false,
            isOpenModalEditBook: false,
            editBook: {}
        }
    }

    async componentDidMount() {
        await this.getAllBooks();
    }

    getAllBooks = async () => {
        let response = await getAllBooksService();
        if (response.data && response.data.errCode === 0) {
            this.setState({
                arrBooks: response.data.books
            })
        }
    }

    handleAddNewBook = () => {
        this.setState({
            isOpenModalAddNewBook: true
        })
    }

    handleEditBook = (book) => {
        this.setState({
            isOpenModalEditBook: true,
            editBook: book
        })
    }

    toggelAddNewBook = () => {
        this.setState({
            isOpenModalAddNewBook: !this.state.isOpenModalAddNewBook
        })
    }

    toggelEditBook = () => {
        this.setState({
            isOpenModalEditBook: !this.state.isOpenModalEditBook
        })
    }

    createNewBook = async (data) => {
        try {
            let response = await createNewBookService(data);
            if (response.data && response.data.errCode !== 0) {
                alert(response.data.errMessage)
            } else {
                await this.getAllBooks();
                this.setState({
                    isOpenModalAddNewBook: false
                })
            }

        } catch (e) {
            console.log(e);
        }
    }

    editBook = async (data) => {
        try {
            let response = await editBookService(data);
            if (response.data && response.data.errCode !== 0) {
                alert(response.data.errMessage)
            } else {
                await this.getAllBooks();
                this.setState({
                    isOpenModalEditBook: false
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleDeleteBook = async (bookId) => {
        try {
            let response = await deleteBookService(bookId);
            if (response.data && response.data.errCode === 0) {
                await this.getAllBooks();
            } else {
                alert(response.data.errMessage)
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let arrBooks = this.state.arrBooks;
        return (
            <div className='user-container'>
                <ModalAddNewBook
                    isOpen={this.state.isOpenModalAddNewBook}
                    toggelAddNewBook={this.toggelAddNewBook}
                    createNewBook={this.createNewBook}
                />
                {
                    this.state.isOpenModalEditBook &&
                    <ModalEditBook
                        isOpen={this.state.isOpenModalEditBook}
                        toggeleditBook={this.toggelEditBook}
                        editBook={this.editBook}
                        currentBook={this.state.editBook}
                    />
                }

                <div className="text-center fs-1 fw-bold title">Manage Books</div>
                <div className='mx-1'>
                    <button className='btn btn-primary mx-5 px-3 btn-add-new-user'
                        onClick={() => this.handleAddNewBook()}
                    ><FaPlus className='font-awesome-plus' /> Add new book</button>
                </div>
                <div className='users-table mt-3 mx-5'>
                    <table id="customers">
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Author</th>
                            <th>Image</th>
                            <th>Publication date</th>
                            <th>Copies owner</th>
                            <th>Action</th>
                        </tr>
                        {arrBooks && arrBooks.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.category_id}</td>
                                    <td>{item.author}</td>
                                    <td>{item.image}</td>
                                    <td>{item.publication_date}</td>
                                    <td>{item.copies_owner}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditBook(item)}>
                                            <FaPencilAlt />
                                        </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteBook(item.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

//export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
export default BookManage;