const express = require('express');
const router = express.Router();
const controller = require('../app/controller/api');
const { auth } = require('../utils/jwt');
const passport = require('../utils/passport');
const passportOAUTH = require('../utils/oauth');

router.post('/api/v1/auth/login', controller.auth.login);
router.post('/api//v1/auth/register', controller.auth.register);
router.post('/api//v1/auth/whoami', auth, controller.auth.whoami);

router.get('/register', (req,res)=>{
    res.render('register.ejs');
});

router.post('/register',controller.auth.registerForm);

router.get('/login', (req,res)=>{
    res.render('login.ejs');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'
}));

router.get('/auth/google', 
passportOAUTH.authenticate('google', {
    scope: ['profile','email']
}));

router.get('/auth/google/callback', 
passportOAUTH.authenticate('google', {
    failureRedirect: '/login',
    session: false
    }),controller.auth.oauth
);

module.exports = router;
