import React from 'react';
import { Link, NavLink } from "react-router-dom"
//import { logoutUser } from "../actions/user_action"
import { useDispatch, useSelector } from 'react-redux';
//import {userProfile} from "../actions/user_action"
import { FaHome, FaAddressBook, FaBook, FaClipboardList, FaUsers, FaUserPlus } from "react-icons/fa";
import "../scss/Sidebar.scss"

const Sidebar = () => {
    //const dispatch = useDispatch();
    const check = 0;


    //const { currentUser } = useSelector(state => state.userLoginReducer);
    return (
        <div className="side-bar-container">
            <ul>
                <li>
                    <FaHome className='font-awesome' />
                    <Link to="/dashboard/" className="side-bar-link">Trang chủ</Link>
                </li>
                <hr />
                <li>
                    <FaAddressBook className='font-awesome' />
                    <Link to="/dashboard/loan" className="side-bar-link">Tạo phiếu mượn</Link>
                </li>
                <hr />
                {/* <li>
                    <FaClipboardList className='font-awesome' />
                    <Link to="/dashboard/allLoan" className="side-bar-link">Danh sách phiếu mượn</Link>
                </li>
                <hr /> */}
                <li>
                    <FaUserPlus className='font-awesome' />
                    <Link to="/dashboard/user" className="side-bar-link">Quản lý người mượn</Link>
                </li>
                <hr />
                <li>
                    <FaBook className='font-awesome' />
                    <NavLink to="/dashboard/book" className="side-bar-link">Quản lý sách</NavLink>
                </li>
                <hr />
                <li>
                    <FaUsers className='font-awesome' />
                    <Link to="/dashboard/staff" className="side-bar-link">Quản lý nhân viên</Link>
                </li>
                <hr />

                {/* <li onClick={() => dispatch(logoutUser())}> <i className="fas fa-power-off text-white"></i>
                    <span style={{ fontSize: "20px", color: "#fff", marginLeft: "2px", fontFamily: "Oswald" }}> Logout </span>    </li> */}
            </ul>
        </div>
    );
};

export default Sidebar;