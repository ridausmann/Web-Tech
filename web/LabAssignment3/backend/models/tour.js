const mongoose = require("mongoose")

var tourSchema = mongoose.Schema({
    destination: String,
    price: String,
    time: String,
    // remarks: String,
    image: String
})
const Tour = mongoose.model("tours", tourSchema);
module.exports = Tour;