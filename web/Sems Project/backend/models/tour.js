const mongoose = require("mongoose")

var tourSchema = mongoose.Schema({
    destination: String,
    price: String,
})
const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;