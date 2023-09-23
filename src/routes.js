const express = require('express');
const router = express.Router();

const userController = require('./controllers/UserController');

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getSingleUser);
router.post('/users/add', userController.addNewUser);
router.put('/users/:id', userController.editUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;