// Variables
const router = require('express').Router();

// Models
const Team = require('../models/Team.model');
const Driver = require('../models/Driver.model');

// Middleware for route guard
const { isLoggedIn } = require('../middleware/route-guard');

//GET all teams page
router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const showTeams = await Team.find();
    res.render('teams/allTeams', {
      showTeams: showTeams,
    });
  } catch (err) {
    console.log(err)
  }
});

// GET load drivers
router.get('/create', isLoggedIn, async (req, res, next) => {
  try {
    const loadDrivers = await Driver.find();
    res.render('teams/createTeam', {
      loadDrivers: loadDrivers,
    })
  } catch (err) {
    console.log('ERROR: ', err);
  }
});

// GET teams details
router.get('/:_id', isLoggedIn, async (req, res, next) => {
  try {
    const showTeamDetails = await Team.findById(req.params._id).populate('drivers');
    res.render('teams/teamDetails', showTeamDetails);
  } catch (err) {
    console.log('ERROR: ', err);
  }
});

// GET create teams page
router.get('/create', isLoggedIn, (req, res, next) => {
  res.render('teams/createTeam');
});

// GET edit team
router.get('/:id/edit', isLoggedIn, async (req, res, next) => {
  try {
    const editTeam = await Team.findById(req.params.id);
    const editDriver = await Driver.find();
    res.render('teams/editTeams', {editTeam, editDriver});
  } catch (err) {
    console.log('Error:', err)
  };
});

//POST create new team
router.post('/create', isLoggedIn, async (req, res, next) => {
  const { teamName, base, teamChief, firstTeamEntry, worldChampionships, imageUrl, drivers } = req.body;
  if (!teamName || !base || !teamChief || !firstTeamEntry || !worldChampionships || !imageUrl || !drivers) {
    res.render('teams/createTeam', { errorMsg: 'You need to fill all inputs' });
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
    res.redirect('/teams');
  } catch (err) {
    console.log('ERROR: ', err)
  }
});

// POST edit team
router.post('/:_id', async (req, res, next) => {
  const {teamName, base, teamChief, firstTeamEntry, worldChampionships, imageUrl, drivers} = req.body;
  try {
    const updateTeam = await Team.findByIdAndUpdate(req.params._id, {teamName, base, teamChief, firstTeamEntry, worldChampionships, imageUrl, drivers}, {new: true});
    res.redirect(`${req.params._id}`); // Redirect to team details
  } catch (err) {
    console.log('Error:', err);
  };
});

// POST delete team
router.post('/:id/delete', isLoggedIn, async (req, res) => {
  try {
    const deleteTeam = await Team.findByIdAndDelete(req.params.id);
    res.redirect('/teams');
  } catch (err) {
    console.log('ERROR: ', err);
  }
});

module.exports = router;
