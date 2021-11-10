const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const fileupload = require('express-fileupload')
const mongoose = require('mongoose')
const passport = require('passport')
const app = new express()

const createPosts = require('./controllers/blogPost/createPost')
const newPost = require('./controllers/blogPost/newPost')
const home = require('./controllers/blogPost/home')
const post = require('./controllers/blogPost/post')
const editPost = require('./controllers/blogPost/editPost')
const getPost = require('./controllers/blogPost/getPost')
const login = require('./controllers/user/login')
const userLogin = require('./controllers/user/userLogin')
const register = require('./controllers/user/register')
const storeUser = require('./controllers/user/storeUser')
//Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect('mongodb://localhost/blogApp')
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.engine('handlebars', handlebars({
    defaultLayout: 'main'
}))
app.use(fileupload())
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')))

app.use(passport.initialize())

app.use(flash())
app.use(methodOverride('_method'))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

//Global variables 
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})
//Index Route 
app.get('/', home)
app.get('/posts/new', newPost)
app.post('/posts/create', createPosts)
app.get('/post/:id', post)
app.get('/posts/edit/:id', getPost)
app.put('/posts/edit/:id', editPost)
app.get('/register', register)
app.get('/login', login)
app.put('/userlogin', userLogin)
app.post('/users/register', storeUser)
const port = 4000

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})