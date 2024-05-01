const express=require('express');
const userRoutes=express.Router();
const userController=require('../controller/user')
const isadminAuth = require("../middleware/is-admin");

userRoutes.post('/login',userController.login);
userRoutes.get('/logout',userController.logout);
userRoutes.post('/register',userController.register);
userRoutes.post('/checkUser',isadminAuth,userController.checkUser)
userRoutes.get('/users',userController.getAllUsers)

module.exports=userRoutes;