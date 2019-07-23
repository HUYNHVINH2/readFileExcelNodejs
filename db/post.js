const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    Title : String,
    Content : String,
    Excerpt : String,
    _yoast_wpseo_title : String,
    _yoast_wpseo_metadesc : String,
    _yoast_wpseo_focuskw : String,
    Status : String,
    Slug : String,
    PostModifiedDate : String,
    URL : String
});
const postModel = mongoose.model('Post', postSchema );
module.exports = postModel;


