const express = require('express');
const router = express.Router();
const controller = require('../app/controller/api');

router.post('/api/v1/auth/login', controller.auth.login);
router.post('/api//v1/auth/register', controller.auth.register);

router.get('/register', (req,res)=>{
    res.render('register.ejs');
});

router.post('/register',controller.auth.registerForm);

module.exports = router;
