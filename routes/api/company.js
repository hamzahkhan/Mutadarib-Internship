const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const Company = require('../../models/Company');

// @route    POST api/company
// @desc     Register company to platform
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('description', 'Please enter your company description for better visibility and reach').not().isEmpty(),
    check('location', 'Please enter your location for better visibility and reach').not().isEmpty(),
    
    check('website', 'Please enter your website for better visibility and reach').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password , location, website, description} = req.body;

    try {
      let company = await Company.findOne({ email });

      if (company) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      company = new Company({
        name,
        email,
        password,
        location,
        website,
        description
      });

      const salt = await bcrypt.genSalt(10);

      company.password = await bcrypt.hash(password, salt);

      await company.save();

      const payload = {
        company: {
          id: company.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


// @route    POST company/login
// @desc     Authenticate company user & get token
// @access   Public
router.post(
    '/login',
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        let company = await Company.findOne({ email });
  
        if (!company) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
  
        const isMatch = await bcrypt.compare(password, company.password);
  
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
  
        const payload = {
          company: {
            id: company.id
          }
        };
  
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: '5 days' },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );

// @route    get company/profile
// @desc     Get current company's profile
// @access   Private
router.get('/profile', auth, async (req,res) => {
    try {
        console.log(req.company)
        const profile = await Company.findOne({
          company: req.company.id
        }).populate('user', ['name']);
        if (!profile) {
          return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})

// @route    update company/profile
// @desc     update current company's profile
// @access   Private
router.post('/update_profile', [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('website', 'Skills is required').not().isEmpty(),
      check('location', 'Skills is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
    ]
  ], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body)
    const {
        name,
        website,
        location,
        description,
      } = req.body;

      const profileFields = {
        company: req.company.id,
        name,
        website: website && website !== '' ? normalize(website, { forceHttps: true }) : '',
        location,
        description
      };
      try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Company.findOneAndUpdate(
          { _id: req.company.id },
          { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.json(profile)
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})

module.exports = router;
