var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EntitySchema   = new Schema({
  keyword: String,
  visitCount: Number,
  timeCreated: Date,
  lastModified: Date,
  stars: Number
});

module.exports = mongoose.model('Keyword', EntitySchema);

