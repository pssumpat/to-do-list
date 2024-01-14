const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoSchema = new Schema({
  userId : {
    type : Schema.Types.ObjectId,
    ref : 'user'
  },
  task: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    default: 'General'
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('todo',TodoSchema);