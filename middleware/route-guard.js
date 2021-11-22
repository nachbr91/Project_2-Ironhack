// Middleware route-guard

// Checks if the user is Logged in when trying to acces a specify page
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
};

module.exports = {
  isLoggedIn
};