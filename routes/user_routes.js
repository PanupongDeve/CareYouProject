const UserController = require('../controllers/user_controller');
const LoginMiddleware = require('../middleware/login_middleware');
const LoggedMiddleware = require('../middleware/logged_middleware');

module.exports = (app) => {
    //Watch for incomming requests of mthod GET
    // to the route http://localhost:3050/api
    app.get('/api/', UserController.RegisterOrLogin);
    app.post('/api/', LoggedMiddleware, UserController.CreateOrAuthen);
    app.get('/api/logout', LoginMiddleware, UserController.Logout);
    app.get('/api/profile', LoginMiddleware, UserController.Profile);
   
};