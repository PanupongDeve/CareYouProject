const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    passwordConf: {
        type: String,
        required: true
    }
});

//authenticate
UserSchema.statics.authenticate = (email, password, callback) => {
    User.findOne({ email })
        .exec((err, user) => {
            if (err) {
                return callback(err);
            } else if (!user) {
                const err = new Error('User not found');
                err.status = 401;
                return callback(err);
            }

            bcrypt.compare(password, user.password, (err, result) => {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            });
        });
};


const User = mongoose.model('user', UserSchema);

module.exports = User;
