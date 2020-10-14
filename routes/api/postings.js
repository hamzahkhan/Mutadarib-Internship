const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');

const companyProfile = require('../../models/Company');
// const company = require('../../models/Company');
const Postings = require('../../models/Posting');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await companyProfile.findOne({
      company: req.company.id
    }).populate('company', ['name']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    GET api/postings/createnew
// @desc     Create a new post as company
// @access   Private
router.post('/createnew', auth,  [
  check('internshipName', 'Name is required').not().isEmpty(),
  check('company', 'company is required').not().isEmpty(),
  check('location', 'location is required').not().isEmpty(),
  check('internType', 'internType is required').not().isEmpty(),
  check('duration', 'duration is required').not().isEmpty(),

], async (req, res)=> {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const {
    internshipName, company, location, internType, duration
  } = req.body

  console.log(req.company)
  const postFields = {
    company_id: req.company.id,
    internshipName, company, location, internType, duration
  }

  try {
    let newPosting = new Postings(postFields)
    await newPosting.save()



  res.json(newPosting)
}catch(err){
console.error(err.message);
res.status(500).send('Server error');
}
})

// @route    GET api/postings/createnew
// @desc     Create a new post as company
// @access   Private

module.exports = router;