const bcrypt = require('bcrypt');

const User = require('../models/user');


module.exports = {
    RegisterOrLogin(req, res) {
      res.send({ hello: 'Welcom to Page' });
    },

    CreateOrAuthen(req, res, next) {
        //confirm user corrected password
        if (req.body.password !== req.body.passwordConf) {
            const err = new Error('Passwords do not mathch.');
            err.status = 400;
            res.send('password dont match');
            return next(err);
        }

        //Register
        if (req.body.email &&
            req.body.username &&
            req.body.password &&
            req.body.passwordConf) {
            
            //hash password
            const passwordHash = bcrypt.hashSync(req.body.password, 10);
    
            
            const userData = {
                email: req.body.email,
                username: req.body.username,
                password: passwordHash,
                passwordConf: passwordHash
            };

            User.create(userData)
                .then(user => {
                    res.send({ userId: user._id });
                });
    
            
        } else if (req.body.logemail && req.body.logpassword) {
            User.authenticate(req.body.logemail, req.body.logpassword, (error, user) => {
                if (error || !user) {
                  const err = new Error('Wrong email or password.');
                  err.status = 401;
                  return next(err);
                } else {
                    res.send({ userId: user._id });
                }
              });
        } else {
            const err = new Error('All fields required.');
            err.status = 400;
            return next(err);
        }
    },

    Profile(req, res, next) {
        User.findById(req.body.userId)
            .then((user) => {
                const sendUser = {
                    id: user._id,
                    email: user.email,
                    username: user.username
                };
                
                return res.send(sendUser);
            })
            .catch(() => {
                return next();
            });     
    },
    Logout(req, res, next) {
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    return next(err);
                } else {
                    return res.redirect('/api/');
                }
            });
        }
    }
};