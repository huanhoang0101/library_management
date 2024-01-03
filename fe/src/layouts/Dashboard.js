import React from 'react';
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { Switch, Route } from "react-router-dom";
import AllUser from "./AllUser";
import AllBook from "./AllBook";
import AllUserLoanBook from "./AllUserLoanBook";
import AddCallCard from "../components/CallCard/AddCallCard";
import AllStaff from "./AllStaff";
import SearchUser from '../components/CallCard/SearchUser';
import SearchBook from '../components/CallCard/SearchBook';
import HomePage from '../components/HomePage/HomePage';

const Dashboard = () => {
    return (
        <div>
            <div style={{ marginBottom: "80px" }}>
                <Navbar />
            </div>

            <div style={{ display: "flex" }}>
                <div style={{ height: "940px", marginLeft: "10px", width: "250px", backgroundColor: "#635c5b" }}>
                    <Sidebar />
                </div>
                <div style={{ height: "940px", marginLeft: "10px", width: "80%" }}>

                    <Switch>

                        <Route path="/dashboard" exact component={HomePage} />
                        <Route path="/dashboard/loan" exact component={SearchUser} />
                        <Route path="/dashboard/allLoan" exact component={AllUserLoanBook} />
                        <Route path="/dashboard/user" exact component={AllUser} />
                        <Route path="/dashboard/book" exact component={AllBook} />
                        <Route path="/dashboard/staff" exact component={AllStaff} />
                        <Route path="/dashboard/loan/:id" exact component={SearchBook} />
                        <Route path="/dashboard/loan/:id/add-loan/" exact component={AddCallCard} />
                    </Switch>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;