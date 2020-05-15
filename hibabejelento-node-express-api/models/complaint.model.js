const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    complaintId: {type: String, unique: true, required: true},
    username: {type: String, required: true, typeKey: '$type'},
    szolgTipus: {type: String, required: true},
    hibaLeiras: {type: String, required: true},
    cim: {type: String, required: true},
    telefon: {type: String, required: true},
    datum: {type: Date, required: true}
});


mongoose.model('complaint', complaintSchema);
