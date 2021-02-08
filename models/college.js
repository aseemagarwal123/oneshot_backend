const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');


var collegeSchema = new mongoose.Schema({
  name:{
    type: String,
  },
  year_founded:{
    type: Number
  },
  city:{
    type: String,
  },
  state:{
    type: String,
  },
  country:{
    type: String,
  },
  number_of_students:{
    type: Number
  },
  courses:{
    type: [String]
  }
});

collegeSchema.plugin(timestamps);
const college = mongoose.model('college', collegeSchema);
exports.college = college;