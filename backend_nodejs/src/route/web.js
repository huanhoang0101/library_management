import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController"

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

    //API
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.get('/api/get-user', userController.handleGetUserById);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/update-user', userController.handleUpdateUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    return app.use("/", router);
}

module.exports = initWebRoutes;