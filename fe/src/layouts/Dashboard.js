import React from 'react';
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { Switch, Route } from "react-router-dom";
import AllUser from "./AllUser";
import AllBook from "./AllBook";
import AllUserLoanBook from "./AllUserLoanBook";
import AddLoan from "./AddLoan";
import AllStaff from "./AllStaff";

const Dashboard = () => {
    return (
        <div>
            <div style={{ marginBottom: "64px" }}>
                {/* <Navbar /> */}
            </div>

            <div style={{ display: "flex" }}>
                <div style={{ height: "940px", marginLeft: "10px", width: "250px", backgroundColor: "#635c5b" }}>
                    <Sidebar />
                </div>
                <div style={{ height: "940px", marginLeft: "10px", width: "80%" }}>

                    <Switch>

                        <Route path="/dashboard" exact element={Dashboard} />
                        <Route path="/dashboard/loan" exact component={AddLoan} />
                        <Route path="/dashboard/allLoan" exact component={AllUserLoanBook} />
                        <Route path="/dashboard/user" exact component={AllUser} />
                        <Route path="/dashboard/book" exact component={AllBook} />
                        <Route path="/dashboard/staff" exact component={AllStaff} />
                    </Switch>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;