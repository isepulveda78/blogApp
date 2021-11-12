const BlogPost = require('../../models/Post')

module.exports = (req, res) => {
    BlogPost.findOne({
        _id: req.params.id
    }).lean()
    .then(post => {
        res.render('posts/edit', {
            title: 'Editing ' + post.title,
            blogpost: post
        })
    })
}