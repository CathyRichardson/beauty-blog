

const getComments = async (req, res) => {
  const db = req.app.get('db');
  try {
    const comments = await db.comments.get_comments(req.params.id)
    res.status(200).send(comments);
  } catch (e) {
    res.status(500).send(e);
  }
}


module.exports = {
  getComments,
}