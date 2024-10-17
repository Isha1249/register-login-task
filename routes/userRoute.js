const express = require('express');
const router = express.Router();
require('express-group-routes');
const UserController = require('../controller/userController.js');
const authMiddleware = require('../middleware/jsonwebtoken');
router.group("/api", (router) => {   
    router.post('/register',UserController.userRegister); 
    router.post('/login', UserController.userlogin); 
    router.use(authMiddleware.verifyToken);
    router.get('/profile', UserController.userProfile); 
  
});
module.exports = router;