// *************** Import Model ***************
const UserTypeModel = require('./user_type.model');

async function GetAllUserTypes(req, res) {
  const userTypes = await UserTypeModel.find({});
  res.status(200).json(userTypes);
}

async function Login(req, res) {}

module.exports = {
  GetAllUserTypes,
};
