// Variables
const router = require('express').Router();

// Models
const Race = require('../models/Race.model');

// Middleware for route guard
const {isLoggedIn} = require('../middleware/route-guard');

// GET all Grand Prix page
router.get('/', isLoggedIn,  async (req, res) => {
  try {
    const showTracks = await Race.find();
    res.render('tracks/allTracks', {
      showTracks: showTracks,
    });
  } catch (err) {
    console.log('ERROR: ', err);
  }
});

// GET create new Grand Prix
router.get('/create', isLoggedIn, (req, res) => {
  res.render('tracks/createTracks');
});

// GET Grand Prix details
router.get('/:_id', isLoggedIn, async (req, res) => {
  try {
    const showTrackDetails = await Race.findById(req.params._id);
    res.render('tracks/trackDetails', showTrackDetails);
  } catch (err) {
    console.log('ERROR: ', err);
  }
});

// GET edit Grand Prix
router.get('/:id/edit', isLoggedIn, async (req, res) => {
  try {
    const editTrack = await Race.findById(req.params.id);
    res.render('tracks/editTrack', {editTrack});
  } catch (err) {
    console.log('ERROR: ', err)
  }
})

// POST create a new Grand Prix
router.post('/create', isLoggedIn, async (req, res) => {
  const {name, circuitName, laps, circuitLength, lapRecord, imageUrl} = req.body;
  if (!name, !circuitName, !laps, !circuitLength, !lapRecord, !imageUrl) {
    res.render('tracks/create', {errorMsg: 'You need to fill all inputs'});
  }
  try {
    const createTrack = await Race.create({
      name,
      circuitName,
      laps,
      circuitLength,
      lapRecord,
      imageUrl,
    });
    res.redirect('/tracks/allTracks');
  } catch (err) {
    console.log('ERROR: ', err);
  }
});

// POST edit Grand Prix
router.post('/:_id', async (req, res) => {
  const {name, circuitName, laps, circuitLength, lapRecord, imageUrl} = req.body;
  try{
    const updateTrack = await Race.findByIdAndUpdate(req.params._id, {name, circuitName, laps, circuitLength, lapRecord, imageUrl}, {new: true});
    res.redirect(`${req.params._id}`) // Redirect to Grand Prix details
  } catch (err) {
    console.log('ERROR: ', err);
  }
});

module.exports = router;