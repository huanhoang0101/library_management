import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
            })
        }
    }

    toggle = () => {
        this.props.toggelEditUser();
    }

    handleOnChangeInput = (event, type) => {
        let copyState = { ...this.state };
        copyState[type] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    handleEditUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            //call API
            this.props.editUser(this.state);
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'firstName', 'lastName', 'phone'];
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
                <ModalHeader toggle={() => { this.toggle() }}>Chỉnh sửa học sinh</ModalHeader>
                <ModalBody>
                    <div class="form-row">
                        <div class="input-container">
                            <label for="inputEmail4">Email</label>
                            <input type="email"
                                class="form-control"
                                name="email"
                                placeholder="Email"
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPhone">Số điện thoại</label>
                            <input type="number"
                                class="form-control"
                                name="phone"
                                placeholder="Số điện thoại"
                                value={this.state.phone}
                                onChange={(event) => { this.handleOnChangeInput(event, "phone") }}
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputFirstName">Tên</label>
                        <input type="text"
                            class="form-control"
                            name="firstName"
                            placeholder="Tên"
                            value={this.state.firstName}
                            onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                        />
                    </div>
                    <div class="form-group">
                        <label for="inputLastName">Họ</label>
                        <input type="text"
                            class="form-control"
                            name="lastName"
                            placeholder="Họ"
                            value={this.state.lastName}
                            onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="px-3"
                        color="primary"
                        onClick={() => { this.handleEditUser() }}>
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

export default ModalEditUser;