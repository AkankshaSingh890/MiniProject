const express = require('express')
const router = express.Router();
const taskController = require('../controller/tasks')
const registerController = require('../controller/register');
const adminController = require('../controller/adminlogin')
const isAuth = require('../middleware/is-user');


//API for the task
router.post('/task', taskController.createTask)
router.get('/task', taskController.getAllTask)
router.put('/task/:_id', taskController.updateTask);
router.delete('/task/:_id', taskController.deleteTask);

//API for the login and Registration for user
router.post('/register', registerController.register);
router.get('/user', registerController.getAllUser)
router.post('/login', registerController.login);
router.get('/auth-user', isAuth, registerController.getAuthUser)

//API for the login for admin
router.post('/loginadmin', adminController.loginadmin);


module.exports = router;