const BlogPost = require('../../models/Post')

module.exports = async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id).lean()
    res.render('post', {
        blogpost
    })
}