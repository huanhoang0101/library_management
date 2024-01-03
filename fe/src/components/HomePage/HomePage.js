import { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './HomePage.scss';

class HomePage extends Component {
    render() {
        return (
            <>
                <div className="home-page-container">
                    {/* <div>
                        <img src='https://res.cloudinary.com/dnrpggpn0/image/upload/v1702549388/logo_lprroz.png'
                            style={{ maxHeight: 150, width: 150, margin: 'auto', display: 'block' }} />
                    </div> */}
                    <div className="home-page-title text-center fs-1 fw-bold pt-4">
                        Quản lý thư viện trường Đại học Mở Thành phố Hồ Chí Minh
                    </div>
                    <div className="home-page-content pt-5">
                        <Link to="/dashboard/loan"  >
                            <button className="btn btn-success btn-home-page">Tạo phiếu mượn</button>
                        </Link>
                        <Link to="/dashboard/user" >
                            <button className="btn btn-primary btn-home-page">Quản lý học sinh</button>
                        </Link>
                        <Link to="/dashboard/book" >
                            <button className="btn btn-warning btn-home-page">Quản lý sách</button>
                        </Link>
                        <Link to="/dashboard/staff" >
                            <button className="btn btn-danger btn-home-page">Quản lý nhân viên</button>
                        </Link>
                    </div>
                </div>
            </>

        )
    }
}

export default HomePage;