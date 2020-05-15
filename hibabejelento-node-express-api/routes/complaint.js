const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const complaintModel = mongoose.model('complaint');


router.route('/newComplaint').post((req, res) => {
    if(req.body.szolgTipus && req.body.hibaLeiras  && req.body.cim && req.body.telefon) {
        const complaint = new complaintModel({
            complaintId: uuidv4(),
            username: req.body.username,
            szolgTipus: req.body.szolgTipus,
            hibaLeiras: req.body.hibaLeiras,
            cim: req.body.cim,
            telefon: req.body.telefon,
            datum: new Date()
        });
        complaint.save(function(error) {
            if(error) return res.status(500).send(error);
            return res.status(200).send({msg: 'Sikeres hibabejelentés!'});
        })
    } else {
        return res.status(400).send({msg: "Hiányzó adatok!"});
    }
});

router.route('/getComplaintListByUsername/:username').get((req, res) => {
    complaintModel.find({username: req.params.username}, function(err, complaints) {
        if(err) return res.status(500).send(err);
        return res.status(200).send(complaints);
    });
});

router.route('/getAllComplaint').get((req, res) => {
    complaintModel.find({}, function(err, complaints) {
        if(err) return res.status(500).send(err);
        return res.status(200).send(complaints);
    });
});


module.exports = router;
