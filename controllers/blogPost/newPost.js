module.exports = (req, res) => {
  if(req.session.userId){
    const title = 'Add New Post'
    res.render('posts/create', {
        title: title
    })
  }else{
      res.redirect('/login')
  }
}