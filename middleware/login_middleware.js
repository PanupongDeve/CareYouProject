module.exports = (req, res, next) => {
    if (!req.body.userId) {
        return res.redirect('/api/');
    } 

    next();
};