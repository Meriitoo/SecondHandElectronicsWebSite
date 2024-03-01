const router = require('express').Router();
const mongoose = require('mongoose');

const authService = require('../services/authService');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/login',  isGuest, (req, res) => {
    res.render('auth/login');
});

router.post('/login',  isGuest, async (req, res) => {
    const { email, password}  = req.body; 

    try{
        const token = await authService.login(email, password); 
        res.cookie('auth', token);
        res.redirect('/');
    }catch(error){
        return res.status(404).render('auth/login', {  email, password, error: getErrorMessage(error) }) 
    }
    
});

router.get('/register',  isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register',  isGuest, async (req, res) => {
    const { username, email, password, repeatPassword} = req.body; 

    try{
        const token = await authService.register(username, email, password, repeatPassword);

        res.cookie('auth', token);
        res.redirect('/');
    }catch(error){
        res.status(400).render('auth/register', {username, email, error: getErrorMessage(error)})
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;