// Middleware route-guard

// Checks if the user is Logged in when trying to acces a specify page
const isLoggedIn = (req, res, next) => {
  if(!req.session.loggedUser) {
    return res.redirect('/login');
  }
  next();
};

// If an already logged in user tries to access the login page
// it redirects the user to the home page
const isLoggedOut = (req, res, next) => {
  if(req.session.loggedUser) {
    return res.redirect('/');
  }
  next();
};

module.exports = {
  isLoggedIn,
  isLoggedOut
};