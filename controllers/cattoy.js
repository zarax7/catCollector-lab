const db = require("../config/database");

async function show(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await db.query("SELECT * FROM cattoy WHERE id =$1", [id]);
    res.render(`catCollectors/showCat`, { cattoy: rows[0] });
  } catch (err) {
    next(err);
  }
}
async function createToy(req, res, next) {
  try {
    const { toyName } = req.body;
    const { id } = req.params;
    const { rows } = await db.query("INSERT INTO cattoy (name) VALUES ($1)", [
      toyName,
    ]);
    res.redirect(`/catCollectors/showCat/${id}`);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  show,
  createToy,
};
