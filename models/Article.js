var mongoose = require("mongoose");

var { Schema } = mongoose;

var ArticleSchema = new Schema({
  headline: String,
  summary: String,
  URL: String
});

var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
