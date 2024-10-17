const jwt = require('jsonwebtoken');
const {User} = require('../model/user');
const verifyToken = async (req, res,next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({status:false,statusCode: 401, message: 'Unauthorized: Missing or invalid token format' });
    }
    const token = authorizationHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
     if (decoded.userId) {
        const user = await User.findById(decoded.userId);
        if (!user || user.currentToken !== token) {
          return res.status(401).send({status:false,statusCode: 401, message: 'Unauthorized: Invalid token.' });
        }
        req.user = user;
      } 
      else {
        return res.status(401).send({status:false,statusCode: 401, message: 'Unauthorized: Invalid token.' });
      }
      next();
    } catch (error) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({status:false,statusCode: 401, message: 'Unauthorized: Invalid token' });
    }
};
module.exports ={verifyToken};
