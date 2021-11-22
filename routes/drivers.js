// Variables
const router = require('express').Router();

// Models
const Driver = require('../models/Driver.model');

// Middleware for route guard
const { isLoggedIn } = require('../middleware/route-guard');

//GET all drivers page
router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const showDrivers = await Driver.find();
    res.render('driver/allDrivers.hbs', {
      showDrivers: showDrivers,
    });
  } catch (err) {
    console.log(err)
  }
});

// GET create drivers page
router.get('/create', isLoggedIn, (req, res, next) => {
  res.render('driver/createDrivers.hbs');
});

//POST create new driver
router.post('/create', isLoggedIn, async (req, res, next) => {
  const { name, country, number, podiums, wonRaces, worldChampionships, imageUrl } = req.body;
  try {
    const createdDriver = await Driver.create({
      name,
      country,
      number,
      podiums,
      wonRaces,
      worldChampionships,
      imageUrl,
    });
    res.redirect('/drivers/create');
  } catch (err) {
    res.render('./driver/createDrivers', {errorMsg: 'You need to fill all inputs'});
  }
});

module.exports = router;
