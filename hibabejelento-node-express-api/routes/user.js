const router = require('express').Router();
const passport = require('passport');
const fs = require('fs');
const mongoose = require('mongoose');
const userModel = mongoose.model('user');

router.route('/login').post((req, res) => {
  if(req.body.username && req.body.password) {
    // here, the method with parameters (error, user) will be recognised as the done() callback by PassportJS
    passport.authenticate('local', (error, user) => {
      if(error) {
        return res.status(403).send('Rossz felhasználónév vagy jelszó!');
      } else {
        // this calls the serializeUser method and initialises the session
        req.logIn(user, (error) => {
          if(error) return res.status(500).send(error);
          return res.status(200).send({msg: "Sikeres bejelntkezés!"});
        });
      }
    })(req, res);
  } else {
    res.status(400).send({msg: "Hiányzó felhazsnálónév vagy jelszó!"});
  }
});

router.route('/logout').post((req, res) => {
  console.log(req.session.passport.user);
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
      role: 'default'
    });
    user.save(function(error) {
      if(error) return res.status(500).send(error);
      return res.status(200).send({msg: 'Sikeres felhasználó regisztráció!'});
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
})

module.exports = router;