import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalStaff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phone: '',
        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggelAddNewStaff();
    }

    handleOnChangeInput = (event, type) => {
        let copyState = { ...this.state };
        copyState[type] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    handleAddNewStaff = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            //call API
            this.props.createNewStaff(this.state);
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phone: '',
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
        return (
            <Modal
                className='model-staff-container'
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Thêm nhân viên mới</ModalHeader>
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
                            <label for="inputPassword4">Mật khẩu</label>
                            <input type="password"
                                class="form-control"
                                name="password"
                                placeholder="Mật khẩu"
                                value={this.state.password}
                                onChange={(event) => { this.handleOnChangeInput(event, "password") }}
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
                    <div class="form-row">
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
                </ModalBody>
                <ModalFooter>
                    <Button className="px-3"
                        color="primary"
                        onClick={() => { this.handleAddNewStaff() }}>
                        Thêm
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

export default ModalStaff;