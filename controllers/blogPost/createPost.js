const BlogPost = require('../../models/Post')
const path = require('path')

module.exports = (req, res) => {
    let errors = [];

    if(!req.body.title){
        errors.push({ text: 'Please add a title '})
    }
    if(!req.body.body){
        errors.push({ text: 'Please add a body '})
    }

    if(errors.length > 0){
        res.render('posts/create', {
            errors: errors,
            title: req.body.title,
            body: req.body.body,
        })
    }else{
        if(req.body.image){
        let image = req.files.image
        image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async(error) => {
            await BlogPost.create({
                ...req.body,
                image: '/img/' + image.name
            })
            req.flash('success_msg', 'Your post has been added')
            res.redirect('/')
            }) 
        }else{
          const postBody = {
              title: req.body.title,
              body: req.body.body
          }
          new BlogPost(postBody)
          .save()
          .then(post => {
            req.flash('success_msg', 'Your post has been added')
            res.redirect('/')
          })
    }
   }
}
