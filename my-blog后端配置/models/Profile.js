const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  author: {
    type: String,
  },
  categories: {
    type: String,
  },
  contentTxt: {
    type: String,
  },
  content: {
    type: String,
    required: true // 必须要给的
  },
  title: {
    type: String,
    required: true // 必须要给的
  },
  date: {
    type: String,
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
