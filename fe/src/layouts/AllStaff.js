import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../scss/StaffManage.scss';
import { getAllStaffService, createNewStaffService, deleteStaffService, editStaffService } from '../services/StaffService';
import ModalAddNewStaff from '../modals/AddNewStaffModal';
import ModalEditStaff from '../modals/EditStaffModal';
import { FaTrash, FaPencilAlt, FaPlus } from "react-icons/fa";

class StaffManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrStaff: [],
            isOpenModalAddNewStaff: false,
            isOpenModalEditStaff: false,
            editStaff: {},
        }


    }

    async componentDidMount() {
        await this.getAllStaff();
    }

    getAllStaff = async () => {
        let response = await getAllStaffService();
        if (response.data && response.data.errCode === 0) {
            this.setState({
                arrStaff: response.data.staff
            })
        }
    }

    handleAddNewStaff = () => {
        this.setState({
            isOpenModalAddNewStaff: true
        })
    }

    handleEditStaff = (staff) => {
        this.setState({
            isOpenModalEditStaff: true,
            editStaff: staff
        })
    }

    toggelAddNewStaff = () => {
        this.setState({
            isOpenModalAddNewStaff: !this.state.isOpenModalAddNewStaff
        })
    }

    toggelEditStaff = () => {
        this.setState({
            isOpenModalEditStaff: !this.state.isOpenModalEditStaff
        })
    }

    createNewStaff = async (data) => {
        try {
            let response = await createNewStaffService(data);
            if (response.data && response.data.errCode !== 0) {
                alert(response.data.errMessage)
            } else {
                await this.getAllStaff();
                this.setState({
                    isOpenModalAddNewStaff: false
                })
            }

        } catch (e) {
            console.log(e);
        }
    }

    editStaff = async (data) => {
        try {
            let response = await editStaffService(data);
            if (response.data && response.data.errCode !== 0) {
                alert(response.data.errMessage)
            } else {
                await this.getAllStaff();
                this.setState({
                    isOpenModalEditStaff: false
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleDeleteStaff = async (staffId) => {
        try {
            let response = await deleteStaffService(staffId);
            if (response.data && response.data.errCode === 0) {
                await this.getAllStaff();
            } else {
                alert(response.data.errMessage)
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let arrStaff = this.state.arrStaff;
        return (
            <div className='staff-container'>
                <ModalAddNewStaff
                    isOpen={this.state.isOpenModalAddNewStaff}
                    toggelAddNewStaff={this.toggelAddNewStaff}
                    createNewStaff={this.createNewStaff}
                />
                {
                    this.state.isOpenModalEditStaff &&
                    <ModalEditStaff
                        isOpen={this.state.isOpenModalEditStaff}
                        toggelEditStaff={this.toggelEditStaff}
                        editStaff={this.editStaff}
                        currentStaff={this.state.editStaff}
                    />
                }

                <div className="text-center fs-1 fw-bold title">Manage staff</div>
                <div className='mx-1'>
                    <button className='btn btn-primary mx-5 px-3 btn-add-new-staff'
                        onClick={() => this.handleAddNewStaff()}
                    ><FaPlus className='font-awesome-plus' /> Add new staff</button>
                </div>
                <div className='staff-table mt-3 mx-5'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                        {arrStaff && arrStaff.filter(staff => staff.role_id == 2).map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditStaff(item)}>
                                            <FaPencilAlt />
                                        </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteStaff(item.id)}>
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

//export default connect(mapStateToProps, mapDispatchToProps)(StaffManage);
export default StaffManage;