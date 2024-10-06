const StoreModel = require('./store.model');

async function CreateStore(req, res) {
  const StoreData = req?.body;

  if (!StoreData) return res.status(400).json({ message: 'request body is empty !' });

  const StoreCreated = await StoreModel.create(StoreData);

  if (!StoreCreated) return res.status(400).json({ message: 'Store not created' });

  return res.status(400).json({ StoreCreated });
}

async function UpdateStore(req, res) {
  const StoreData = req?.body;
  const { Store_id } = req?.params;

  if (!StoreData) return res.status(400).json({ message: 'request body is empty !' });
  if (!Store_id) return res.status(400).json({ message: 'user_id is empty !' });

  if (!StoreData?.user_id) return res.status(500).json({ message: 'Store must have user_id' });

  const StoreUpdated = await StoreModel.findByIdAndUpdate(Store_id, { $set: { ...StoreData } }, { new: true });

  if (!StoreUpdated) return res.status(400).json({ message: 'Store not update' });

  return res.status(400).json({ StoreUpdated });
}

async function GetAllStores(req, res) {
  const StoreData = await StoreModel.find({ status: 'active' });
  return res.status(200).json({ StoreData });
}

async function GetOneStore(req, res) {
  const { Store_id } = req?.params;

  const StoreData = await StoreModel.findById(Store_id);

  const responseUserData = await RemoveCreatedAndUpdatedAt(StoreData);

  return res.status(200).json({ responseUserData });
}

module.exports = {
  CreateStore,
  GetAllStores,
  GetOneStore,
  UpdateStore,
};
