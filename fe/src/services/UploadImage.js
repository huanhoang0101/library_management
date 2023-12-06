import axios from "axios";
import { reject } from "lodash";

export const apiUploadImage = (img) => {
    new Promise(async (resolve, reject) => {
        try {
            const cloudName = process.env.REACT_APP_CLOUD_NAME
            const res = await axios({
                method: "post",
                url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                data: img
            })
            resolve(res.data.secure_url)
        } catch (e) {
            reject(e)
        }
    })
}
