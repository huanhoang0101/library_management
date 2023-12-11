import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'

class ModalEditStaff extends Component {

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
        let staff = this.props.currentStaff;
        if (staff && !_.isEmpty(staff)) {
            this.setState({
                id: staff.id,
                email: staff.email,
                firstName: staff.firstName,
                lastName: staff.lastName,
                phone: staff.phone,
            })
        }
    }

    /* componentDidUpdate() {
        let staff = this.props.currentStaff;
        if (staff && !_.isEmpty(staff)) {
            this.setState({
                id: staff.id,
                email: staff.email,
                firstName: staff.firstName,
                lastName: staff.lastName,
                phone: staff.phone,
            })
        }
    } */

    toggle = () => {
        this.props.toggelEditStaff();
    }

    handleOnChangeInput = (event, type) => {
        let copyState = { ...this.state };
        copyState[type] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    handleEditStaff = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            //call API
            this.props.editStaff(this.state);
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
                className='model-staff-container'
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit staff</ModalHeader>
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
                            <label for="inputPhone">Phone</label>
                            <input type="number"
                                class="form-control"
                                name="phone"
                                placeholder="Phone"
                                value={this.state.phone}
                                onChange={(event) => { this.handleOnChangeInput(event, "phone") }}
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
                </ModalBody>
                <ModalFooter>
                    <Button className="px-3"
                        color="primary"
                        onClick={() => { this.handleEditStaff() }}>
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

//export default connect(mapStateToProps, mapDispatchToProps)(ModalEditStaff);
export default ModalEditStaff;