import db from '../models/index';
import bcrypt from 'bcryptjs';

var salt = bcrypt.genSaltSync(10);

let handleStaffLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let staffData = {};
            //check email exist
            let isExist = await checkEmail(email);
            if (isExist) {
                let staff = await findStaffByEmail(email);
                //check password
                let check = await bcrypt.compareSync(password, staff.password);
                if (check) {
                    staffData.errCode = 0;
                    staffData.errMessage = 'OK';

                    delete staff.password;
                    staffData.staff = staff;
                } else {
                    staffData.errCode = 3;
                    staffData.errMessage = 'Wrong password';
                }
            } else {
                staffData.errCode = 1;
                staffData.errMessage = "Your email isn't exist!"
            }

            resolve(staffData);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllStaff = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let staff = await db.User.findAll({
                attributes: {
                    exclude: ['password']
                },
                where: { role_id: 2 }
            });

            resolve(staff);
        } catch (e) {
            reject(e);
        }
    })
}

let getStaffById = (staffId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let staff = await db.User.findOne({
                where: { id: staffId },
                attributes: {
                    exclude: ['password']
                }
            })

            resolve(staff);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewStaff = (data) => {
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
                    role_id: 2
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

let updateStaff = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            let staff = await db.User.findOne({
                where: { id: data.id },
                raw: false
            });

            if (staff) {
                staff.firstName = data.firstName;
                staff.lastName = data.lastName;
                staff.phone = data.phone;

                await staff.save();

                resolve({
                    errCode: 0,
                    message: 'Update staff success'
                });
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "Staff not found"
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

let deleteStaff = (staffId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let staff = await findStaffById(staffId)

            if (staff) {
                //await staff.destroy();
                await db.User.destroy({
                    where: { id: staffId }
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Staff is deleted'
                })
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "Staff isn't exist"
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}



let findStaffById = (staffId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let staff = await db.User.findOne({
                where: { id: staffId },
            })

            resolve(staff)
        } catch (e) {
            reject(e);
        }
    })
}

let findStaffByEmail = (staffEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let staff = await db.User.findOne({
                where: { email: staffEmail },
            })

            resolve(staff)
        } catch (e) {
            reject(e);
        }
    })
}

let checkEmail = (staffEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let staff = await findStaffByEmail(staffEmail);

            if (staff) {
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
    handleStaffLogin: handleStaffLogin,
    getAllStaff: getAllStaff,
    getStaffById: getStaffById,
    createNewStaff: createNewStaff,
    updateStaff: updateStaff,
    deleteStaff: deleteStaff
}