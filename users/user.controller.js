// *************** Import library ***************
const bcrypt = require('bcrypt');

// *************** Import Model ***************
const UserModel = require('./user.model');

// *************** Import Utils ***************
const { RemoveCreatedAndUpdatedAt } = require('../common');

/**
 * Registers a new user.
 *
 * @async
 * @function RegisterUser
 * @param {Object} req - The request object, containing the user data.
 * @param {Object} req.body - The request body containing user registration information.
 * @param {string} req.body.first_name - The first name of the user.
 * @param {string} req.body.last_name - The last name of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object used to send responses.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 *
 * @throws {400} - If any of the required fields are missing or if the user already exists.
 * @throws {500} - If an error occurs during user creation.
 */
async function RegisterUser(req, res) {
  // Get Data from request
  const userData = req?.body;

  // Check field required
  if (!userData?.first_name || !userData?.last_name || !userData?.email || !userData?.password) {
    return res.status(400).json({ message: 'First name, last name, email, and password are required' });
  }

  // Check if user already exists
  const existingUser = await UserModel.findOne({ email: userData?.email }).lean();
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      password: hashedPassword, // Store the hashed password
    };

    await UserModel.create(newUser);

    res.status(201).json({ id: newUser.id, first_name: newUser.first_name, last_name: newUser.last_name, email: newUser.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function GetOneUser(req, res) {
  const { user_id } = req?.params;

  const userData = await UserModel.findById(user_id).lean();

  delete userData.password;

  const responseUserData = await RemoveCreatedAndUpdatedAt(userData);

  return res.status(200).json({ responseUserData });
}

module.exports = {
  RegisterUser,
  GetOneUser,
};
