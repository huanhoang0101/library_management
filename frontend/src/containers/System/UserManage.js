import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsersService, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalAddNewUser from './ModalAddNewUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from "../../utils/emitter"

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalAddNewUser: false,
            isOpenModalEditUser: false,
            editUser: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsers();
    }

    getAllUsers = async () => {
        let response = await getAllUsersService();
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalAddNewUser: true
        })
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            editUser: user
        })
    }

    toggelAddNewUser = () => {
        this.setState({
            isOpenModalAddNewUser: !this.state.isOpenModalAddNewUser
        })
    }

    toggelEditUser = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsers();
                this.setState({
                    isOpenModalAddNewUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }

        } catch (e) {
            console.log(e);
        }
    }

    editUser = async (data) => {
        try {
            let response = await editUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsers();
                this.setState({
                    isOpenModalEditUser: false
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleDeleteUser = async (userId) => {
        try {
            let response = await deleteUserService(userId);
            if (response && response.errCode === 0) {
                await this.getAllUsers();
            } else {
                alert(response.errMessage)
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='user-container'>
                <ModalAddNewUser
                    isOpen={this.state.isOpenModalAddNewUser}
                    toggelAddNewUser={this.toggelAddNewUser}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggelEditUser={this.toggelEditUser}
                        editUser={this.editUser}
                        currentUser={this.state.editUser}
                    />
                }

                <div className="text-center title">Manage users</div>
                <div className='mx-1'>
                    <button className='btn btn-primary mx-5 px-3'
                        onClick={() => this.handleAddNewUser()}
                    ><i className='fas fa-plus'></i> Add new user</button>
                </div>
                <div className='users-table mt-3 mx-5'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditUser(item)}>
                                            <i className='fas fa-pencil-alt'></i>
                                        </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteUser(item.id)}>
                                            <i className='fas fa-trash'></i>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
