

const getComments = async (req, res) => {
  const db = req.app.get('db');
  try {
    const result = await db.comments.get_comments(req.params.id)
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
}

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


module.exports = {
  getComments,
  getAllProducts,
  getProduct
}