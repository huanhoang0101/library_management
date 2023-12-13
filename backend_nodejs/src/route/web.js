import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import bookController from "../controllers/bookController";
import staffController from "../controllers/staffController";
import loanController from "../controllers/loanController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    router.get('/crud', homeController.getCRUDPage);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.readCRUDPage);
    router.get('/edit-crud', homeController.getEditCRUDPage);

    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    //API-USER
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.get('/api/get-user-by-id', userController.handleGetUserById);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/update-user', userController.handleUpdateUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    //API-BOOK
    router.get('/api/get-all-books', bookController.handleGetAllBooks);
    router.post('/api/create-new-book', bookController.handleCreateNewBook);
    router.put('/api/update-book', bookController.handleUpdateBook);
    router.delete('/api/delete-book', bookController.handleDeleteBook);
    router.post('/api/get-book-by-id', bookController.handleGetBookById);

    //API-STAFF
    router.post('/api/login', staffController.handleLogin);
    router.get('/api/get-all-staff', staffController.handleGetAllStaff);
    router.get('/api/get-staff', staffController.handleGetStaffById);
    router.post('/api/create-new-staff', staffController.handleCreateNewStaff);
    router.put('/api/update-staff', staffController.handleUpdateStaff);
    router.delete('/api/delete-staff', staffController.handleDeleteStaff);

    //API-LOAN
    router.get('/api/get-all-loans', loanController.handleGetAllLoans);
    router.post('/api/create-new-loan', loanController.handleCreateNewLoan);
    router.put('/api/update-loan', loanController.handleUpdateLoanReturnDay);

    return app.use("/", router);
}

module.exports = initWebRoutes;