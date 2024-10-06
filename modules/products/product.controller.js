const ProductModel = require('./product.model');

async function CreateProduct(req, res) {
  const productData = req?.body;

  if (!productData) return res.status(400).json({ message: 'request body is empty !' });

  const productCreated = await ProductModel.create(productData);

  if (!productCreated) return res.status(400).json({ message: 'product not created' });

  return res.status(400).json({ productCreated });
}

async function UpdateProduct(req, res) {
  const productData = req?.body;
  const { product_id } = req?.params;

  if (!productData) return res.status(400).json({ message: 'request body is empty !' });
  if (!product_id) return res.status(400).json({ message: 'product_id is empty !' });

  if (productData?.stock < 0) return res.status(500).json({ message: 'stoct can not be Minus !!!' });
  if (!productData?.store_id) return res.status(500).json({ message: 'product must have store_id' });

  const productUpdated = await ProductModel.findByIdAndUpdate(product_id, { $set: { ...productData } }, { new: true });

  if (!productUpdated) return res.status(400).json({ message: 'product not update' });

  return res.status(400).json({ productUpdated });
}

async function GetAllProducts(req, res) {
  const productData = await ProductModel.find();
  return res.status(200).json({ productData });
}

async function GetOneProduct(req, res) {
  const { product_id } = req?.params;

  const productData = await ProductModel.findById(product_id);

  const responseUserData = await RemoveCreatedAndUpdatedAt(productData);

  return res.status(200).json({ responseUserData });
}

module.exports = {
  CreateProduct,
  GetAllProducts,
  GetOneProduct,
  UpdateProduct,
};
