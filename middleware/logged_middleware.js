module.exports = (req, res, next) => {
    //console.log(req.session);
    
    if (req.body.userId) {
        return res.redirect(307, '/api/profile');
    } 

    next();
};