import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


const Navbar = () => {

    /* const { currentUser } = useSelector(state => state.userLoginReducer);
    console.log(currentUser) */
    return (
        <div >
            <nav className=" shadow   bg-white rounded navbar fixed-top navbar-white " style={{ height: "80px", display: 'flex' }}>
                <div className="container">
                    {/* <a className="navbar-brand" href="/dashboard"
                        style={{ fontFamily: "oswald", fontSize: "48px", marginTop: "-150px" }}>Quản lý thư viện</a> */}
                    <img src='https://res.cloudinary.com/dnrpggpn0/image/upload/v1702549388/logo_lprroz.png'
                        style={{ maxHeight: 70 }} />
                    {/* <p style={{ textAlign: "center", marginRight: "10%", fontFamily: "sans-serif", fontSize: "24px" }}>
                        <i className="far fa-user "></i> {" "}{currentUser && currentUser.user.name.split(" ")[0]}</p> */}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;