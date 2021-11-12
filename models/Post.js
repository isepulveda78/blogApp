const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const BlogPost = mongoose.model('posts', BlogSchema)
module.exports = BlogPost
