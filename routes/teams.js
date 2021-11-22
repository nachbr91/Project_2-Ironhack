// Variables
const router = require('express').Router();

// Models
const Team = require('../models/Team.model');
const Driver = require('../models/Driver.model');

// Middleware for route guard
const { isLoggedIn } = require('../middleware/route-guard');

//GET all drivers page
router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const showTeams = await Team.find();
    res.render('teams/allTeams.hbs', {
      showTeams: showTeams,
    });
  } catch (err) {
    console.log(err)
  }
});

// GET load drivers
router.get('/create', async (req, res, next) => {
  try {
    const loadDrivers = await Driver.find();
    res.render('teams/createTeam', {
      loadDrivers: loadDrivers,
    })
  } catch (err) {
    console.log('ERROR: ', err);
  }
});

// GET create drivers page
router.get('/create', isLoggedIn, (req, res, next) => {
  res.render('teams/createTeams');
});

//POST create new team
router.post('/create', isLoggedIn, async (req, res, next) => {
  const { teamName, base, teamChief, firstTeamEntry, worldChampionships, imageUrl, drivers } = req.body;
  if (!teamName || !base || !teamChief || !firstTeamEntry || !worldChampionships || !imageUrl || !drivers) {
    res.render('teams/createTeams', { errorMsg: 'You need to fill all inputs' });
    return;
  }
  try {
    const createdDTeam = await Team.create({
      teamName,
      base,
      teamChief,
      firstTeamEntry,
      worldChampionships,
      imageUrl,
      drivers,
    });
    res.redirect('/teams/create');
  } catch (err) {
    console.log('ERROR: ', err)
  }
});

module.exports = router;
