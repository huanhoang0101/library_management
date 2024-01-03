import React, { Component } from 'react';
import axios from 'axios';
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

    handleUploadImage = async (event) => {
        const preset_key = process.env.REACT_APP_UPLOAD_ASSETS_NAME;
        const cloud_name = process.env.REACT_APP_CLOUD_NAME;
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append("upload_preset", preset_key);
        await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            .then(res => this.setState({ image: res.data.secure_url }))
            .catch(err => console.log(err));

        //let response = await apiUploadImage(formData);
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
                <ModalHeader toggle={() => { this.toggle() }}>Chỉnh sửa sách</ModalHeader>
                <ModalBody>
                    <div class="form-row">
                        <div class="input-container">
                            <label for="inputTitle">Tiêu đề</label>
                            <input type="text"
                                class="form-control"
                                name="title"
                                placeholder="Tiêu đề"
                                value={this.state.title}
                                onChange={(event) => { this.handleOnChangeInput(event, "title") }}
                            />
                        </div>
                        <div class="input-container">
                            <label for="inputauthor4">Tác giả</label>
                            <input type="author"
                                class="form-control"
                                name="author"
                                placeholder="Tác giả"
                                value={this.state.author}
                                onChange={(event) => { this.handleOnChangeInput(event, "author") }}
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputpublication_date">Ngày xuất bản</label>
                        <input type="date"
                            class="form-control"
                            name="publication_date"
                            placeholder="Ngày xuất bản"
                            value={this.state.publication_date}
                            onChange={(event) => { this.handleOnChangeInput(event, "publication_date") }}
                        />
                    </div>
                    <div class="form-group">
                        <label for="inputcopies_owner">Số bản</label>
                        <input type="text"
                            class="form-control"
                            name="copies_owner"
                            placeholder="Số bản"
                            value={this.state.copies_owner}
                            onChange={(event) => { this.handleOnChangeInput(event, "copies_owner") }}
                        />
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputImage">Ảnh bìa</label>
                            <input type="file"
                                class="form-control"
                                name="image"
                                onChange={(event) => { this.handleUploadImage(event) }}
                            />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputCategory">Thể loại</label>
                            <select id="inputState" class="form-control"
                                onChange={(event) => { this.handleOnChangeInput(event, "category_id") }}>
                                <option value="1" selected>Choose...</option>
                                <option value="2">...</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="px-3"
                        color="primary"
                        onClick={() => { this.handleEditBook() }}>
                        Sửa
                    </Button>{' '}
                    <Button className="px-3"
                        color="secondary"
                        onClick={() => { this.toggle() }}>
                        Hủy
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

export default ModalEditBook;