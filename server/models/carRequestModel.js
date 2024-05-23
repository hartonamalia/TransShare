const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const carRequestSchema = new Schema({
    carId:String,
    requesterId:String,
    pickupLocation: String,
    dropOffLocation:String,
    pickupDate:Date,
    returnDate:Date,
    requestStatus:Number,
});

module.exports = mongoose.model("CarRequest", carRequestSchema);