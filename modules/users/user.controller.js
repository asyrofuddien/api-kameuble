// *************** Import library ***************
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// *************** Import Model ***************
const UserModel = require('./user.model');

// *************** Import Utils ***************
const { RemoveCreatedAndUpdatedAt } = require('../../common');

async function RegisterUser(req, res) {
  // Get Data from request
  const userData = req?.body;

  // Check field required
  if (!userData?.first_name || !userData?.last_name || !userData?.email || !userData?.password || !userData?.user_type) {
    return res.status(400).json({ message: 'First name, last name, email, user type, and password are required' });
  }

  // Check if user already exists
  const existingUser = await UserModel.findOne({ email: userData?.email });
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
      user_type: userData.user_type,
      password: hashedPassword, // Store the hashed password
    };

    await UserModel.create(newUser);

    res.status(201).json({
      message: 'User Craeted',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function GetOneUser(req, res) {
  const { user_id } = req?.params;
  const { userLogin } = req;

  const userData = await UserModel.findById(user_id);

  if (userData?.password) delete userData.password;

  const responseUserData = await RemoveCreatedAndUpdatedAt(userData);

  return res.status(200).json({ responseUserData });
}

async function Login(req, res) {
  const { email, password } = req?.body;

  const userData = await UserModel.findOne({ email });

  if (!userData) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Compare the provided password with the hashed password in the database
  const isMatch = await bcrypt.compare(password, userData.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Generate a JWT token for the new user
  const token = jwt.sign({ id: userData._id, email: userData.email }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expiration time
  });

  return res.status(400).json({ token });
}

module.exports = {
  RegisterUser,
  GetOneUser,
  Login,
};
