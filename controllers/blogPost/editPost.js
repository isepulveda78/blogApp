const BlogPost = require('../../models/Post')

module.exports = (req, res) => {

    BlogPost.findOne({
        _id: req.params.id
    })
    .then(post => {
        let user = req.session.userId
        let postUser = post.user 
        if(user === postUser){
        post.title = req.body.title
        post.body = req.body.body

        if(req.body.image){
            post.image = req.body.image
        }

        post.save()
        .then(post => {
            req.flash('success_msg', 'Post has been updated')
            res.redirect('/')
        })
        }else{
        req.flash('error_msg', 'Not authorized')
        res.redirect('/')
        }
    })
}