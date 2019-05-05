const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
//const auth = require('../../middleware/auth');


// @route GET api/profile
// @desc Tests profile route
// @access Public
router.get('/', (req, res) => res.send('Profile route'));


// Load Profile model
const Profile = require('../../models/Profile');
// Load User profile
const User = require('../../models/User');

// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get('/me', async (req, res) => {
  try{

  } catch(err){
    console.log(err.message);
    res.status(500).send('server Error');
  }
});

// @route GET api/profile/test
// @desc Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({msg: 'Profile works'}));

// @route GET api/profile
// @desc Get current users profile
// @access Private
router.get('/',passport.authenticate('jwt', {session:false}), (req,res) => {
  const errors = {};
  Profile.findOne({user: req.user.id})
   .then(profile => {
     if(!profile){
       errors.noprofile = 'There is no profile for this user';
       return res.status(404).json(errors);
     }
     res.json(profile);
   })
   .catch(err => res.status(404).json(err));
});

// @route Post api/profile
// @desc Create or Edit user profile
// @access Private
router.post('/',passport.authenticate('jwt', {session:false}), 
  (req,res) => {
    // Get Fields
    const profileFields = {};
    profileFields.user - req.user.id; // logded in user
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.handle = req.body.bio;
    if(req.body.status) profileFields.handle = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    // Skills - Split into array
    if(typeof req.body.skills !== 'undefined'){
      profileFields.skills = req.body.skills.split(',');
    } 
    // Social
    profileFields.social = {}; 
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twiiter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.intagram) profileFields.social.intagram = req.body.intagram;

 
    Profile.findOne({ user: req.user.id })
      .then(profile =>{
        if(profile){
          // update profile
          Profile.findOneAndUpdate({ user: req.user.id}, { $set: profileFields }, { new:reuw });
        }else{
          // Create
        }
      })
    
  }
);

module.exports = router;

