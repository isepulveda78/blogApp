const BlogPost = require('../../models/Post')
module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({}).lean()
    res.render('index', {
        blogposts
    })
}