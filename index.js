const express = require('express')
const app = new express()

const path = require('path')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const fileupload = require('express-fileupload')
const mongoose = require('mongoose')
const methodOverride = require('method-override');

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
const logout = require('./controllers/user/logout')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Method override middleware
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

const myMiddleware = (req, res, next) => {
    next()
}
app.use(myMiddleware)

app.use(flash())

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

global.loggedIn = null 
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})


//Global variables 
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.session.userId || null
    next()
})
//Index Route 
app.get('/', home)
app.get('/posts/new', authMiddleware, newPost)
app.post('/posts/create', authMiddleware, createPosts)
app.get('/post/:id', post)
app.get('/posts/edit/:id', authMiddleware, getPost)
app.put('/posts/edit/:id', authMiddleware, editPost)
app.get('/register', redirectIfAuthenticatedMiddleware, register)
app.get('/login', redirectIfAuthenticatedMiddleware, login)
app.get('/logout', logout)
app.post('/userlogin', redirectIfAuthenticatedMiddleware, userLogin)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUser)
const port = 4000

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})