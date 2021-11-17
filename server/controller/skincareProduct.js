
const getAllProducts = async (req, res) => {
  const db = req.app.get('db');
  try {
    const result = await db.products.get_products()
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
}

const getProduct = async (req, res) => {
  const db = req.app.get('db');
  try {
    const result = await db.products.get_product(req.params.id);
    const currProduct = result[0];   //massive db queries return an array. 
    if (!currProduct) {
      return res.status(404).send('Product not found');
    }
    res.status(200).send(currProduct);
  } catch (e) {
    res.status(500).send(e);
  }
}

const updateProduct = async (req, res) => {
  const db = req.app.get('db');
  try {
    const { image, name, type, price, size, review, is_recommended } = req.body;
    await db.products.admin_update_product(
      req.params.id,
      req.session.user.id,
      image,
      name,
      type,
      price,
      size,
      review,
      is_recommended
    );
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e);
  }
}

const deleteProduct = async (req, res) => {
  const db = req.app.get('db');
  try {
    await db.products.admin_delete_product(req.params.id, req.session.user.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e);
  }
}


module.exports = {
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct
}