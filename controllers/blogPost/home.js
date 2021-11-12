const BlogPost = require('../../models/Post')
module.exports = async (req, res) => {
    const title = 'Welcome'
    const blogposts = await BlogPost.find({user: req.session.userId}).lean()
    res.render('index', {
        title: title,
        blogposts
    })
}