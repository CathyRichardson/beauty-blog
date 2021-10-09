

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


module.exports = {
  getComments,
  getAllProducts
}