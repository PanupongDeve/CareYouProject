module.exports = (req, res, next) => {
    console.log(req.session);
    if (!req.session.userId) {
        return res.redirect('/api/');
    } 

    next();
};