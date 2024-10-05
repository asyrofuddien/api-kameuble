// user.controller.test.js
const { RegisterUser, GetOneUser } = require('./user.controller');
const UserModel = require('./user.model'); // Mock the UserModel
const bcrypt = require('bcrypt');

jest.mock('./user.model'); // Automatically mock the UserModel
jest.mock('bcrypt'); // Automatically mock bcrypt

describe('User Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe('RegisterUser', () => {
    it('should return 400 if required fields are missing', async () => {
      await RegisterUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'First name, last name, email, and password are required' });
    });

    it('should return 400 if user already exists', async () => {
      req.body = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      UserModel.findOne.mockResolvedValueOnce({}); // Mock existing user
      await RegisterUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
    });

    it('should create a new user and return 201', async () => {
      req.body = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      UserModel.findOne.mockResolvedValueOnce(null); // No existing user
      bcrypt.hash.mockResolvedValueOnce('hashedPassword'); // Mock hashed password

      await RegisterUser(req, res);

      expect(UserModel.create).toHaveBeenCalledWith({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'hashedPassword',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: undefined, // id is not defined in the controller; you may want to adjust this if you generate IDs elsewhere
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
      });
    });

    it('should return 500 on error', async () => {
      req.body = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      UserModel.findOne.mockResolvedValueOnce(null);
      bcrypt.hash.mockImplementationOnce(() => {
        throw new Error('Hash error');
      });

      await RegisterUser(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
  });

  describe('GetOneUser', () => {
    it('should return user data without password', async () => {
      req.params.user_id = '67011bdf6bfca9678a5b15f0';
      const user = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'hashedPassword',
      };

      UserModel.findById.mockResolvedValueOnce(user); // Mock findById return

      await GetOneUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        responseUserData: { first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
      });
    });

    it('should handle errors gracefully', async () => {
      req.params.user_id = '12345';
      UserModel.findById.mockResolvedValueOnce(null); // Mock no user found

      await GetOneUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ responseUserData: null });
    });
  });
});
