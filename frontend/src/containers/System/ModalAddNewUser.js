import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phone: '',
        }

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phone: '',
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggelAddNewUser();
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
        return (
            <Modal
                className='model-user-container'
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Add new user</ModalHeader>
                <ModalBody>
                    <div class="form-row">
                        <div class="input-container">
                            <label for="inputEmail4">Email</label>
                            <input type="email"
                                class="form-control"
                                name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                            />
                        </div>
                        <div class="input-container">
                            <label for="inputPassword4">Password</label>
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
                        <label for="inputFirstName">First Name</label>
                        <input type="text"
                            class="form-control"
                            name="firstName"
                            placeholder="First Name"
                            value={this.state.firstName}
                            onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                        />
                    </div>
                    <div class="form-group">
                        <label for="inputLastName">Last Name</label>
                        <input type="text"
                            class="form-control"
                            name="lastName"
                            placeholder="Last Name"
                            value={this.state.lastName}
                            onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                        />
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputPhone">Phone</label>
                            <input type="number"
                                class="form-control"
                                name="phone"
                                placeholder="Phone"
                                value={this.state.phone}
                                onChange={(event) => { this.handleOnChangeInput(event, "phone") }}
                            />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="inputRole">Role</label>
                            <select name="role_id" class="form-control">
                                <option value="1" selected>User</option>
                                <option value="2">Staff</option>
                                <option value="3">Admin</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="px-3"
                        color="primary"
                        onClick={() => { this.handleAddNewUser() }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
