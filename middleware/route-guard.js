// Middleware route-guard

// Checks if user is Logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
};

const isLoggedOut = (req, res, next) => {
  if (req.session.passport) {
    return res.redirect('/');
  }
  next();
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
};
