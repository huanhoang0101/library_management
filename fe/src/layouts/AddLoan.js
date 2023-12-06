import { Component } from "react";
import axios from "axios";
import { apiUploadImage } from "../services/UploadImage";

class AddLoan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ""
        }
    }

    handleUploadImage = async (event) => {
        const preset_key = process.env.REACT_APP_UPLOAD_ASSETS_NAME;
        const cloud_name = process.env.REACT_APP_CLOUD_NAME;
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append("upload_preset", preset_key);
        axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            .then(res => this.setState({ image: res.data.secure_url }))
            .catch(err => console.log(err));
        //let response = await apiUploadImage(formData);
    }

    render() {
        return (
            <>
                <div>AddLoan</div>
                <form method="post" enctype="multipart/form-data">
                    <input type="file" name="image" onChange={this.handleUploadImage} />
                </form>
                <div className="mt-3">
                    {this.state.image ? (<img src={this.state.image} />) : (<div></div>)}
                </div>
            </>
        )
    }
}


export default AddLoan;