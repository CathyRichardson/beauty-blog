const e = require("express");

const getAllProducts = async (req, res) => {
  const db = req.app.get('db');
  try {
    const result = await db.products.get_products();
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

const getProductsRecommended = async (req, res) => {
  const db = req.app.get('db');
  try {
    const result = await db.products.get_products_recommended();

    // convert db results into array of objects with yes and no counts
    let recommended = [];
    for (let i = 0; i < result.length; i++) {
      const { product_id, product_name, is_recommended, count } = result[i];
      let index = recommended.findIndex((product) => product.productId === product_id);
      if (index < 0) {
        // add new object
        recommended.push({
          productId: product_id,
          productName: product_name,
          yesCount: is_recommended === true ? count : 0,
          noCount: is_recommended === false ? count : 0
        })
      } else {
        // update existing object
        is_recommended === true ? recommended[index].yesCount = count : recommended[index].noCount = count;
      }
    }

    res.status(200).send(recommended);
  } catch (e) {
    res.status(500).send(e);
  }
}

const updateProduct = async (req, res) => {
  const db = req.app.get('db');
  try {
    const { image, name, type, price, size, review, isRecommended } = req.body;
    await db.products.admin_update_product(req.params.id, req.session.user.id, image, name, type, price, size, review, isRecommended);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e);
  }
}

const adminDeleteProductComments = async (req, res, next) => {
  const db = req.app.get('db');
  try {
    //product id and user id
    await db.products.delete_product_comments(req.params.id, req.session.user.id)
    next();
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

const addProduct = async (req, res) => {
  const db = req.app.get('db');
  try {
    const { image, name, type, price, size, review, isRecommended } = req.body;
    const result = await db.products.admin_add_product(image, name, type, price, size, review, isRecommended);
    res.status(200).send(result[0]);
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = {
  getAllProducts,
  getProduct,
  getProductsRecommended,
  updateProduct,
  deleteProduct,
  addProduct,
  adminDeleteProductComments
}