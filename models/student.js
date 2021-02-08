const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');


var studentSchema = new mongoose.Schema({
  name:{
    type: String,
  },
  batch_year:{
    type: Number,
    default:null
  },
  college:{
     type: Schema.Types.ObjectId, ref: 'college' 
  },
  skills:{
    type: [String]
  }
});

studentSchema.plugin(timestamps);
const student = mongoose.model('student', studentSchema);
exports.student = student;