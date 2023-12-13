import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../scss/UserManage.scss';
import { getAllUsersService, createNewUserService, deleteUserService, editUserService } from '../services/UserService';
import ModalAddNewUser from '../modals/AddNewUserModal';
import ModalEditUser from '../modals/EditUserModal';
import { FaTrash, FaPencilAlt, FaPlus } from "react-icons/fa";

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalAddNewUser: false,
            isOpenModalEditUser: false,
            editUser: {},
        }


    }

    async componentDidMount() {
        await this.getAllUsers();
    }

    getAllUsers = async () => {
        let response = await getAllUsersService();
        if (response.data && response.data.errCode === 0) {
            this.setState({
                arrUsers: response.data.users
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
            if (response.data && response.data.errCode !== 0) {
                alert(response.data.errMessage)
            } else {
                await this.getAllUsers();
                this.setState({
                    isOpenModalAddNewUser: false
                })
            }

        } catch (e) {
            console.log(e);
        }
    }

    editUser = async (data) => {
        console.log(data);
        try {
            let response = await editUserService(data); console.log("=====", response)
            if (response.data && response.data.errCode !== 0) {
                alert(response.data.errMessage)
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
            if (response.data && response.data.errCode === 0) {
                await this.getAllUsers();
            } else {
                alert(response.data.errMessage)
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

                <div className="text-center fs-1 fw-bold title">Manage users</div>
                <div className='mx-1'>
                    <button className='btn btn-primary mx-5 px-3 btn-add-new-user'
                        onClick={() => this.handleAddNewUser()}
                    ><FaPlus className='font-awesome-plus' /> Add new user</button>
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
                        {arrUsers && arrUsers.filter(users => users.role_id == 1).map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditUser(item)}>
                                            <FaPencilAlt />
                                        </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteUser(item.id)}>
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
export default UserManage;