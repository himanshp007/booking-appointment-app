const express = require('express');

const router = express.Router();

const userController = require('../controllers/User');

router.post('/add-user', userController.postUser);

router.get('/get-user', userController.getAllUser);

router.put('/edit-user/:Id', userController.editUser);

router.delete('/delete-user/:Id', userController.deleteUser);

module.exports = router;