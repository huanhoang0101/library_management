import db from '../models/index';
import bcrypt from 'bcryptjs';

var salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            //check email exist
            let isExist = await checkEmail(email);
            if (isExist) {
                let user = await findUserByEmail(email);
                //check password
                let check = await bcrypt.compareSync(password, user.password);
                if (check) {
                    userData.errCode = 0;
                    userData.errMessage = 'OK';

                    delete user.password;
                    userData.user = user;
                } else {
                    userData.errCode = 3;
                    userData.errMessage = 'Wrong password';
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = "Your email isn't exist!"
            }

            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                attributes: {
                    exclude: ['password']
                },
                where: { role_id: 1 }
            });

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
                where: { id: userId },
                attributes: {
                    exclude: ['password']
                }
            })

            resolve(user);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in use'
                })
            } else {
                let hashPassWord = await hashPassword(data.password);
                await db.User.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                    email: data.email,
                    password: hashPassWord,
                    role_id: 1
                })

                resolve({
                    errCode: 0,
                    message: 'OK'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            });

            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.phone = data.phone;

                await user.save();

                resolve({
                    errCode: 0,
                    message: 'Update user success'
                });
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "User not found"
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await findUserById(userId)

            if (user) {
                //await user.destroy();
                await db.User.destroy({
                    where: { id: userId }
                })

                resolve({
                    errCode: 0,
                    errMessage: 'User is deleted'
                })
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "User isn't exist"
                });
            }

            /* let userList = await getAllUsers();
            resolve(userList); */
        } catch (e) {
            reject(e);
        }
    })
}



let findUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                //attributes: ['email', 'role_id', 'password'],
                //raw: true
            })

            resolve(user)
        } catch (e) {
            reject(e);
        }
    })
}

let findUserByEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
                //attributes: ['email', 'role_id', 'password'],
                //raw: true
            })

            resolve(user)
        } catch (e) {
            reject(e);
        }
    })
}

let checkEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await findUserByEmail(userEmail);

            if (user) {
                resolve(true);
            } else {
                resolve(false)
            }
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

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    createNewUser: createNewUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}