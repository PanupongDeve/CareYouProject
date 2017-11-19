const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const UserRoutes = require('./routes/user_routes');
const app = express();

//ติดต่อ Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Careyou');
const db = mongoose.connection;

//handle mongo Error
db.on('error', console.error.bind(console, 'conection error'));
db.once('open', () =>{
    console.log('Conect Database Success');
});

//user sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

//ติดตั้ง json middleware by bodyParser.json
app.use(bodyParser.json());

//กำหนด route function
UserRoutes(app);

//catch404 and forward error handle
app.use((req, res, next) => {
    const err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

//error handlee
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

module.exports = app;