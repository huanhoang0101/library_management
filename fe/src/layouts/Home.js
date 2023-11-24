import React from 'react';
import { Link, NavLink } from "react-router-dom";
import StudentIMage from "../Images/student4.jpg";
import AdminIMage from "../Images/admin2.jpg";
import '../scss/Home.scss';

const Home = () => {
    return (
        <div className="HomePage"  >

            <div className="col-md-6 m-auto home-container">
                <div className="card">
                    <img src={AdminIMage} alt="StudentIMage" />
                    <br />
                    <NavLink className="link_class" to="/adminLogin"> <h3 >Signin as  Admin</h3></NavLink>
                </div>
                <div className="card">
                    <img src={StudentIMage} alt="StudentIMage" />
                    <br />
                    <Link className="link_class" to="/login"> <h3 >Signin as  Student</h3></Link>
                </div>
            </div>
            {/* <div>
                <Link to="/login">signin as a admin</Link>
            </div>
            <div>

                <Link to="/login">signin as a student</Link>
            </div>
            <div>
                <Link to="/addBook">Add Book</Link>
            </div>
            <div>

                <Link to="/allBook">All Book</Link>
            </div>
            <div>

<Link to="/stuReqIssue">Issue Request</Link>
</div>
            <div>
        
<Link to="/manageStudent">Manage Student</Link>
</div> */}

        </div>
    );
};

export default Home;