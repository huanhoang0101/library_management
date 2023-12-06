import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

class ModalAddBook extends Component {
    //formData = new FormData();

    constructor(props) {
        super(props);
        this.state = {
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
    }

    toggle = () => {
        this.props.toggelAddNewBook();
    }

    handleOnChangeInput = (event, type) => {
        let copyState = { ...this.state };
        copyState[type] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    handleAddNewBook = async () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            //call API
            this.props.createNewBook(this.state);
            this.setState({
                title: '',
                publication_date: '',
                copies_owner: '',
                image: '',
                description: '',
                author: '',
                category_id: '',
            })
        }
        /* this.props.createNewBook(this.state);
        this.setState({
            title: '',
            publication_date: '',
            copies_owner: '',
            image: '',
            description: '',
            author: '',
            category_id: '',
        }) */
        console.log("==========", this.state)
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
                className='model-user-container'
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Add new book</ModalHeader>
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
                            <label for="inputauthor4">Author</label>
                            <input type="text"
                                class="form-control"
                                name="author"
                                placeholder="Author"
                                value={this.state.author}
                                onChange={(event) => { this.handleOnChangeInput(event, "author") }}
                            />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="input-container">
                            <label for="inputpublication_date">Publication date</label>
                            <input type="date"
                                class="form-control"
                                name="publication_date"
                                value={this.state.publication_date}
                                onChange={(event) => { this.handleOnChangeInput(event, "publication_date") }}
                            />
                        </div>
                        <div class="input-container">
                            <label for="inputcopies_owner">Copies owner</label>
                            <input type="number"
                                class="form-control"
                                name="copies_owner"
                                placeholder="Copies owner"
                                value={this.state.copies_owner}
                                onChange={(event) => { this.handleOnChangeInput(event, "copies_owner") }}
                            />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="input-container">
                            <label for="inputImage">Image</label>
                            <input type="file"
                                class="form-control"
                                name="image"
                                onChange={(event) => { this.handleUploadImage(event) }}
                            />
                        </div>
                        <div class="input-container">
                            <label for="inputCategory">Category</label>
                            {/* <input type="number"
                                class="form-control"
                                name="category"
                                placeholder="Category"
                                value={this.state.category_id}
                                onChange={(event) => { this.handleOnChangeInput(event, "category_id") }}
                            /> */}
                            <select id="inputState" class="form-control"
                                onChange={(event) => { this.handleOnChangeInput(event, "category_id") }}>
                                <option value="1" selected>Choose...</option>
                                <option value="2">...</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputdescription">Description</label>
                        <textarea type="text"
                            class="form-control"
                            name="description"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={(event) => { this.handleOnChangeInput(event, "description") }}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="px-3"
                        color="primary"
                        onClick={() => { this.handleAddNewBook() }}>
                        Add
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

//export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
export default ModalAddBook;