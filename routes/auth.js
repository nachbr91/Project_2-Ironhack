// Variables
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Model
const User = require('../models/User.model');

// // Middleware for route guard
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

//GET sign up
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

// GET log in
router.get('/login', (req, res, next) => {
  res.render('login');
});

// GET logout
router.get('/logout', (req, res, next) => {
  req.logout();
  res.clearCookie('connect.sid'), { path: '/' };
  req.session.destroy();
  res.redirect('/');
});

// POST sign up new user
router.post('/signup', async (req, res, next) => {
  const { username, password, email, repeatPassword } = req.body;

  // To check that user has filled all inputs
  if (!username || !password || !email || !repeatPassword) {
    res.render('signup', { errorMsg: 'Please, fill all inputs' });
    return;
  }

  // To compare both passwords
  if (password !== repeatPassword) {
    res.render('signup', { errorMsg: 'Passwords do not match' });
    return;
  }

  // To check if the password has at least 8 characters and it's a combination of numbers, lowercase and uppercase letters
  if (
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password) ===
    false
  ) {
    res.render('signup', {
      errorMsg:
        'Your password should be a combination of at least 8 numbers, lowercase and uppercase letters',
    });
    return;
  }

  // To check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.render('signup', { errorMsg: 'This user already has an account' });
    return;
  }

  // To check if the email is correct
  if (/\S+@\S+\.\S+/.test(email) === false) {
    res.render('signup', { errorMsg: 'Please, enter a valid email' });
    return;
  }

  // To create an user in DB
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });
    res.redirect('login');
  } catch (err) {
    console.log('ERROR: ', err);
  }
});

// POST log in with passport
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      return next(err);
    }

    if (!theUser) {
      res.render('login', { errorMsg: 'Incorrect username or password' });
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        return next(err);
      }
      console.log(req.session.passport.user)
      res.redirect('/user/profile');
    });
  })(req, res, next);
});

// POST logout
router.post('/logout', async (req, res, next) => {
  res.clearCookie('connect.sid'), { path: '/' };
  try {
    await req.session.destroy();
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
