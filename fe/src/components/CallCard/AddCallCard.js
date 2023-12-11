import React, { Component } from 'react';
import { connect } from 'react-redux';
//import '../scss/UserManage.scss';
//import { getAllBooksService, createNewBookService, deleteBookService, editBookService } from '../services/BookService';

class BookManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            book_id: '',
            loan_day: '',
            due_day: ''
        }
    }

    componentDidMount() {

    }

    handleOnChangeInput = (event, type) => {
        let copyState = { ...this.state };
        copyState[type] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            //call API
            this.props.createNewUser(this.state);
            this.setState({
                user_id: '',
                book_id: '',
                loan_day: '',
                due_day: ''
            })
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'phone'];
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
        let arrBooks = this.state.arrBooks;
        return (
            <>
                <div class="form-row">
                    <div class="input-container">
                        <label for="inputEmail4">user_id</label>
                        <input type="email"
                            class="form-control"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                        />
                    </div>
                    <div class="input-container">
                        <label for="inputPassword4">book_id</label>
                        <input type="password"
                            class="form-control"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                        />
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputFirstName">loan_day</label>
                    <input type="text"
                        class="form-control"
                        name="firstName"
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                    />
                </div>
                <div class="form-group">
                    <label for="inputLastName">due_day</label>
                    <input type="text"
                        class="form-control"
                        name="lastName"
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                    />
                </div>
            </>
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