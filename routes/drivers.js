// Variables
const router = require('express').Router();

// Models
const Driver = require('../models/Driver.model');
const Team = require('../models/Team.model');

// Middleware for route guard
const { isLoggedIn } = require('../middleware/route-guard');

//GET all drivers page
router.get('/allDrivers', isLoggedIn, async (req, res, next) => {
  try {
    const showDrivers = await Driver.find();
    res.render('driver/allDrivers', {
      showDrivers: showDrivers,
    });
  } catch (err) {
    console.log(err)
  }
});

// GET create drivers page
router.get('/create', isLoggedIn, (req, res, next) => {
  res.render('driver/createDrivers');
});

// GET load teams
router.get('/create', isLoggedIn, async (req, res, next) => {
  try {
    const loadTeams = await Team.find();
    res.render('driver/createDrivers', {
      loadTeams: loadTeams,
    })
  } catch (err) {
    console.log('ERROR: ', err);
  }
});

// GET driver details page
router.get('/:_id', isLoggedIn, async (req, res, next) => {
  try {
    const showDriverDetails = await Driver.findById(req.params._id).populate('team');
    res.render('driver/driverDetails', showDriverDetails);
  } catch (err) {
    console.log('ERROR: ', err);
  }
});

// GET edit driver page
router.get('/:id/edit', isLoggedIn, async (req, res, next) => {
  try {
    const editDriver = await Driver.findById(req.params.id);
    const editTeam = await Team.find();
    res.render('driver/editDriver', {editDriver, editTeam});
  } catch (err) {
    console.log('Error:', err)
  };
});

//POST create new driver
router.post('/create', isLoggedIn, async (req, res, next) => {
  const { name, lastName, country, number, team, podiums, wonRaces, worldChampionships, imageUrl } = req.body;
  if (!name || !lastName || !country || !number || !podiums || !wonRaces || !worldChampionships || !imageUrl) {
    res.render('driver/createDrivers', { errorMsg: 'You need to fill all inputs' });
    return;
  }
  try {
    const createdDriver = await Driver.create({
      name,
      lastName,
      country,
      number,
      team,
      podiums,
      wonRaces,
      worldChampionships,
      imageUrl,
    });
    res.redirect('/drivers/create');
  } catch (err) {
    console.log('ERROR: ', err);
    // res.render('./driver/createDrivers', {errorMsg: 'You need to fill all inputs'});
  }
});

// POST edit driver
router.post('/:_id', async (req, res, next) => {
  const {name, lastName, country, number, team, podiums, wonRaces, worldChampionships, imageUrl} = req.body;
  try {
    const updateDriver = await Driver.findByIdAndUpdate(req.params._id, {name, lastName, country, number, team, podiums, wonRaces, worldChampionships, imageUrl}, {new: true});
    res.redirect(`${req.params._id}`); // Redirect to driver details
  } catch (err) {
    console.log('Error:', err);
  };
});

module.exports = router;