import db from '../models/index';
import CRUDServices from '../services/CRUDServices';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }
}

let getAboutPage = (req, res) => {
    return res.render('aboutPage.ejs');
}

let getCRUDPage = (req, res) => {
    return res.render('crudPage.ejs');
}

let postCRUD = async (req, res) => {
    await CRUDServices.createNewUser(req.body);
    return res.render('read-crudPage.ejs', {
        userList: await CRUDServices.getAllUsers(),
    });
}

let readCRUDPage = async (req, res) => {
    let data = await CRUDServices.getAllUsers();
    return res.render('read-crudPage.ejs', {
        userList: data,
    });
}

let getEditCRUDPage = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let user = await CRUDServices.getUserById(userId);

        return res.render('edit-crudPage.ejs', {
            user: user,
        })
    } else {
        return res.send('user not found')
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let userList = await CRUDServices.updateUserData(data);
    return res.render('read-crudPage.ejs', {
        userList: userList,
    })
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userList = await CRUDServices.deleteUserById(userId);
        return res.send(userList);
    } else {
        return res.send('User not found')
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUDPage: getCRUDPage,
    postCRUD: postCRUD,
    readCRUDPage: readCRUDPage,
    getEditCRUDPage: getEditCRUDPage,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}