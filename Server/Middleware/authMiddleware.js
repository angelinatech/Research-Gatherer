const jwt = require('jsonwebtoken')


// *~*~*~* making sure they have token to auth the route *~*~*~* 

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorised' });
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          console.log(err)
          return res.status(403).json({ error: 'Verboten' });
        }
        console.log(user);
        req.user = user;
        next();

    });
};

module.exports = authMiddleware;