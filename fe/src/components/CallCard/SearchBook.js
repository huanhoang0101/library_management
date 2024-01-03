import { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getAllBooksService } from '../../services/BookService';
import './SearchTable.scss';

class SearchBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrBooks: [],
            keyword: '',
        }
    }

    async componentDidMount() {
        await this.getAllBooks();
    }

    getAllBooks = async () => {
        let response = await getAllBooksService();
        if (response.data && response.data.errCode === 0) {
            this.setState({
                arrBooks: response.data.books
            })
        }
    }

    render() {
        let arrBooks = this.state.arrBooks;
        return (
            <>
                <div className="text-center fs-1 fw-bold title">Tìm sách</div>
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
                            <th>Tiêu đề</th>
                            <th>Tác giả</th>
                            <th>Ảnh bìa</th>
                            <th>Số bản</th>
                            <th>Hành động</th>
                        </tr>
                        {arrBooks && arrBooks.filter((item) => {
                            return this.state.keyword.toLowerCase() === ''
                                ? item
                                : item.title.toLowerCase().includes(this.state.keyword) || item.id.toLowerCase().includes(this.state.keyword);
                        })
                            .map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td><img src={item.image} /></td>
                                    <td>{item.copies_owner}</td>
                                    <td>
                                        <Link to={{
                                            pathname: `/dashboard/loan/${this.props.match.params.id}/add-loan/`,
                                            state: { bookId: item.id }
                                        }}>
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

export default SearchBook;