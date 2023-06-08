var mongoose = require("mongoose");

var areaSchema = mongoose.Schema({
    name: String,
    locality: String,
    attractions: String
});
const Area = mongoose.model("areas", areaSchema);

module.exports = Area;