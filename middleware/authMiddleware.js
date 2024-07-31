const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authorization = req.headers['authorization'];
  const token = authorization && authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token', message: error.message });
  }
};

module.exports = authMiddleware;