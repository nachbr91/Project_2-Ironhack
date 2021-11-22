// Variables
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Route-guard
// const ensureLogin = require('connect-ensure-login');
// const ensureLogout = require('connect-ensure-logout');

// Model
const User = require('../models/User.model');

//GET sign up
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

// GET log in
router.get('/login', (req, res, next) => {
  res.render('login');
});

// GET log in passport
router.get('/login', (req, res, next) => {
  res.render('login', { errorMsg: req.flash('Incorrect email or password') });
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

// // POST log in user
// router.post('/login', async (req, res, next) => {
//   const { username, password } = req.body;

//   // To check that fields are not empty
//   if (!username || !password) {
//     res.render('login', { errorMsg: 'Please, fill all inputs' });
//     return;
//   }

//   // To check if user exist
//   const existingUser = await User.findOne({ username: username });
//   if (!existingUser) {
//     res.render('login', { errorMsg: 'User does not exist' });
//     return;
//   }

//   // To check is password is correct
//   const passwordMatch = await bcrypt.compare(password, existingUser.password);
//   if (!passwordMatch) {
//     res.render('login', { errorMsg: 'Incorrect password' });
//     return;
//   }

//   // To make log in
//   req.session.loggedUser = existingUser;
//   console.log('SESSION =======> ', req.session);
//   res.redirect('profile');
// });

// POST log in user
// router.post(
//   '/login',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: 'login',
//     failureFlash: true
//   })
// );

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      // Something went wrong authenticating user
      return next(err);
    }

    if (!theUser) {
      // Unauthorized, `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
      res.render('login', { errorMsg: 'Incorrect username or password' });
      return;
    }

    // save user in session: req.user
    req.login(theUser, err => {
      if (err) {
        // Session save went bad
        return next(err);
      }

      // All good, we are now logged in and `req.user` is now set
      res.redirect('/');
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
