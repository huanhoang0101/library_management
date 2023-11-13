import bcrypt from 'bcryptjs';
import db from '../models/index';

var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassWord = await hashPassword(data.password);
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                email: data.email,
                password: hashPassWord,
                role_id: data.role_id,
            })

            resolve('');
        } catch (e) {
            reject(e);
        }
    })
}

let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassWord = await bcrypt.hashSync(password, salt);
            resolve(hashPassWord)
        } catch (e) {
            reject(e);
        }

    })
}

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({ raw: true });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (user) {
                resolve(user);
            } else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })

            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.phone = data.phone;

                await user.save();

                let userList = await db.User.findAll();

                resolve(userList);
            } else {
                resolve('');
            }

        } catch (e) {
            reject(e);
        }
    })
}

let deleteUserById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (user) {
                await user.destroy();
            } else {
                resolve('');
            }

            let userList = await getAllUsers();
            resolve(userList);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}