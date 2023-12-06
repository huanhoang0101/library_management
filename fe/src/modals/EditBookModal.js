import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'

class ModalEditBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            publication_date: '',
            copies_owner: '',
            image: '',
            description: '',
            author: '',
            category_id: '',
        }
    }

    componentDidMount() {
        let book = this.props.currentBook;
        if (book && !_.isEmpty(book)) {
            this.setState({
                id: book.id,
                title: book.title,
                publication_date: book.publication_date,
                copies_owner: book.copies_owner,
                image: book.image,
                description: book.description,
                author: book.author,
                category_id: book.category_id,
            })
        }
    }

    toggle = () => {
        this.props.toggelEditBook();
    }

    handleOnChangeInput = (event, type) => {
        let copyState = { ...this.state };
        copyState[type] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    handleEditBook = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            //call API
            this.props.editBook(this.state);
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['title', 'publication_date', 'copies_owner', 'image', 'description', 'author', 'category_id'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing required parameter: ' + arrInput[i]);
                break;
            }
        }

        return isValid;
    }


    render() {
        return (
            <Modal
                className='model-book-container'
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit book</ModalHeader>
                <ModalBody>
                    <div class="form-row">
                        <div class="input-container">
                            <label for="inputTitle">Title</label>
                            <input type="text"
                                class="form-control"
                                name="title"
                                placeholder="Title"
                                value={this.state.title}
                                onChange={(event) => { this.handleOnChangeInput(event, "title") }}
                            />
                        </div>
                        <div class="input-container">
                            <label for="inputauthor4">author</label>
                            <input type="author"
                                class="form-control"
                                name="author"
                                placeholder="author"
                                value={this.state.author}
                                onChange={(event) => { this.handleOnChangeInput(event, "author") }}
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputpublication_date">publication_date</label>
                        <input type="text"
                            class="form-control"
                            name="publication_date"
                            placeholder="publication_date"
                            value={this.state.publication_date}
                            onChange={(event) => { this.handleOnChangeInput(event, "publication_date") }}
                        />
                    </div>
                    <div class="form-group">
                        <label for="inputcopies_owner">copies_owner</label>
                        <input type="text"
                            class="form-control"
                            name="copies_owner"
                            placeholder="copies_owner"
                            value={this.state.copies_owner}
                            onChange={(event) => { this.handleOnChangeInput(event, "copies_owner") }}
                        />
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputImage">Image</label>
                            <input type="number"
                                class="form-control"
                                name="image"
                                placeholder="Image"
                                value={this.state.image}
                                onChange={(event) => { this.handleOnChangeInput(event, "image") }}
                            />
                        </div>
                    </div><div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputCategory">category_id</label>
                            <input type="number"
                                class="form-control"
                                name="category"
                                placeholder="Category"
                                value={this.state.category_id}
                                onChange={(event) => { this.handleOnChangeInput(event, "category_id") }}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="px-3"
                        color="primary"
                        onClick={() => { this.handleEditBook() }}>
                        Edit
                    </Button>{' '}
                    <Button className="px-3"
                        color="secondary"
                        onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

//export default connect(mapStateToProps, mapDispatchToProps)(ModalEditBook);
export default ModalEditBook;