const BlogPost = require('../../models/Post')
module.exports = async (req, res) => {
    const title = 'Welcome'
    const blogposts = await BlogPost.find({}).lean()
    res.render('index', {
        title: title,
        blogposts
    })
}