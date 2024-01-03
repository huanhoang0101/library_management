import React, { Component } from 'react';
import { FaCircle, FaEnvelope, FaPhone, FaPrint } from "react-icons/fa";
//import '../scss/UserManage.scss';
import { createNewLoanService } from '../../services/LoanService';
import { getUserByIdService } from '../../services/UserService';
import { getBookByIdService } from '../../services/BookService';

class AddCallCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            book_id: '',
            loan_day: '',
            loan_day_display: '',
            due_day: '',
            due_day_display: '',
            userName: '',
            userEmail: '',
            bookName: ''
        }
    }

    async componentDidMount() {
        let today = new Date();

        let dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + parseInt(process.env.REACT_APP_DUE));

        let userId = this.props.match.params.id;

        let bookId = this.props.location.state.bookId;

        this.setState({
            loan_day: today,
            due_day: dueDate,
            loan_day_display: today.toLocaleDateString('en-GB'),
            due_day_display: dueDate.toLocaleDateString('en-GB'),
            user_id: userId,
            book_id: bookId
        })

        await this.getUserById();
        await this.getBookById();
    }

    getUserById = async () => {
        let response = await getUserByIdService(this.props.match.params.id);
        if (response.data && response.data.errCode === 0) {
            this.setState({
                userName: response.data.user.lastName + " " + response.data.user.firstName,
                userEmail: response.data.user.email
            })
        }
    }

    getBookById = async () => {
        let response = await getBookByIdService(this.props.location.state.bookId);
        console.log(response)
        if (response.data && response.data.errCode === 0) {
            this.setState({
                bookName: response.data.book.title
            })
        }
    }

    handleAddNewLoan = async () => {
        //call API
        await createNewLoanService(this.state);
    }

    render() {
        return (
            <>
                <div class="title">
                    <div class="text-center">In Phiếu mượn sách</div>

                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="container mb-5 mt-3">
                            <div class="container">
                                <div class="col-md-12">
                                    <div class="text-center">
                                        <i class="far fa-building fa-4x ms-0"></i>
                                        <p class="pt-2">Thư viện Trường Đại học Mở Thành phố Hồ Chí Minh</p>
                                    </div>
                                    <div>
                                        <p class="text-center">Phiếu mượn sách</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-8">
                                        <ul class="list-unstyled">
                                            <li class="text-muted">Tên: <span>{this.state.userName}</span></li>
                                            <li class="text-muted">Email: <span>{this.state.userEmail}</span></li>
                                            <li class="text-muted">Tên sách: <span>{this.state.bookName}</span></li>

                                        </ul>
                                    </div>
                                    <div class="col-xl-4">

                                        <ul class="list-unstyled">
                                            <li class="text-muted"><FaCircle /> <span
                                                class="fw-bold">Ngày mượn: </span>{this.state.loan_day_display}</li>
                                            <li class="text-muted"><FaCircle /> <span
                                                class="fw-bold">Hạn trả: </span>{this.state.due_day_display}</li>
                                        </ul>
                                    </div>
                                </div>

                                <hr />
                                <div class="row">
                                    <div class="col-xl-8">
                                        <p class="ms-3">Thông tin liên hệ</p>
                                    </div>
                                    <div>
                                        <li class="text-muted"><FaEnvelope /><span
                                            class="fw-bold">thuviendhmo@.ou.edu.vn</span></li>
                                        <li class="text-muted"><FaPhone /><span
                                            class="fw-bold">0785553654</span></li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button class="btn btn-success float-end" id="invoice-print"
                        onClick={() => this.handleAddNewLoan()}
                    ><FaPrint /> In phiếu</button>
                </div>
            </>
        );
    }

}

export default AddCallCard;