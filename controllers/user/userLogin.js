const bcrypt = require('bcrypt');
const User = require('../../models/User');

module.exports = (req, res) => {
    const { username, password } = req.body;
    User.findOne({username: username}, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) { // if passwords match
                    console.log(user)
                    req.session.userId = user._id
                    res.redirect('/')
                    req.flash('success_msg', "You're logged in.")
                } else {
                    res.redirect('/login')
                }
            })
        } else {
            res.redirect('/login')
        }
    })
}