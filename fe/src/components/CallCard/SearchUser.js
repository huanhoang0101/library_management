import { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FaAddressBook } from "react-icons/fa";
import { getAllUsersService } from "../../services/UserService";

class SearchUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            keyword: ''
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

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <>
                <div className="text-center fs-1 fw-bold title">Tìm học sinh</div>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                        onChange={(e) => { this.setState({ keyword: e.target.value }) }}
                    />
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                <div className='users-table mt-3 mx-5'>
                    <table id="customers">
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Action</th>
                        </tr>
                        {arrUsers && arrUsers.filter((item) => {
                            return this.state.keyword.toLowerCase() === ''
                                ? item
                                : item.email.toLowerCase().includes(this.state.keyword) || item.id.toLowerCase().includes(this.state.keyword);
                        })
                            .map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>
                                        <Link to={`/dashboard/loan/${item.id}`}>
                                            <button>Tạo phiếu mượn</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </table>
                </div>

            </>
        )
    }
}

export default SearchUser;