const jwt = require('jsonwebtoken');

// *************** Import Model ***************
const UserModel = require('../modules/users/user.model');

/**
 * Middleware to require authentication for a resolver.
 *
 * @param {Function} resolver - The resolver function to wrap with authentication.
 * @param {Object} parent - The parent resolver.
 * @param {Object} args - The arguments for the resolver.
 * @param {Object} ctx - The GraphQL context.
 * @throws {AuthenticationError} If the user is not authenticated.
 * @returns {Promise} The result of the resolver function.
 */
const RequireAuth = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    // If no token is found, return an error
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    // Verify token and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
    const userId = decoded.id;

    // Find the user from the database
    const user = await UserModel.findById(userId);

    // If user not found, return an error
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Attach user information to the request
    req.userLogin = user;

    // Call next() to continue to the route handler
    next();
  } catch (error) {
    // Handle token verification error
    return res.status(401).json({ message: 'Invalid token', error });
  }
};

module.exports = {
  RequireAuth,
};
