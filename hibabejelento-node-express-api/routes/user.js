const router = require('express').Router();
const passport = require('passport');
const fs = require('fs');
const mongoose = require('mongoose');
const userModel = mongoose.model('user');

router.route('/login').post((req, res) => {
  //res.header('Access-Control-Allow-Origin', '*');
  if(req.body.username && req.body.password) {
    // here, the method with parameters (error, user) will be recognised as the done() callback by PassportJS
    passport.authenticate('local', (error, user) => {
      if(error) {
        return res.status(403).send('Rossz felhasználónév vagy jelszó!');
      } else {
        // this calls the serializeUser method and initialises the session
        req.logIn(user, (error) => {
          if(error) return res.status(500).send(error);
          return res.status(200).send({user});
        });
      }
    })(req, res);
  } else {
    res.status(400).send({msg: "Hiányzó felhazsnálónév vagy jelszó!"});
  }
});

router.route('/logout').post((req, res) => {
  //console.log(req.session.passport.user);
  if(req.isAuthenticated()) {
    req.logout();
    res.status(200).send({msg: "Sikeres kijelentkezés"});
  } else {
    res.status(403).send({msg: "Log in, before you log out"})
  }
});

router.route('/register').post((req, res) => {
  if(req.body.username && req.body.password) {
    const user = new userModel({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      vezeteknev: req.body.keresztnev,
      keresztnev: req.body.keresztnev,
      email: req.body.email,
    });
    user.save(function(error) {
      if(error) return res.status(500).send(error);
      return res.status(200).send({user});
    })
  } else {
    return res.status(400).send({msg: "Hiányzó felhasználónév vagy jelszó!"});
  }
});

router.route('/users').get((req, res) => {
  if(req.isAuthenticated()) {
    userModel.find({}, function(err, users) {
      if(err) return res.status(500).send(err);
      return res.status(200).send(users);
    });
  } else {
    return res.status(403).send({msg: 'Please even if you are no admin at least log in!'});
  }
});

router.route('/getUserByUsername/:username').get((req, res) => {
  userModel.find({username: req.params.username}, function(err, users) {
    if(err) return res.status(500).send(err);
    return res.status(200).send(users);
  });
});

router.route('/update').post((req, res) => {
  if(req.body.username && req.body.vezeteknev && req.body.keresztnev && req.body.email) {
    userModel.update({username: req.body.username},{
      $set:{
        "vezeteknev": req.body.vezeteknev,
        "keresztnev": req.body.keresztnev,
        "email": req.body.email
      }}, function(error) {
      if(error) return res.status(500).send(error);
      return res.status(200).send({msg: "Sikeres módosítás!"});
    });
  } else {
    return res.status(400).send({msg: "Sikertelen módosítás!"});
  }
});

module.exports = router;
