const db = require("../config/database");

async function index(req, res, next) {
  try {
    const { rows } = await db.query("SELECT * FROM cats");
    res.render("index", { cat: rows });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
async function show(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await db.query("SELECT * FROM cats  WHERE id =$1", [id]);
    res.render("catCollectors/showCat", { cat: rows[0] });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

function newCat(req, res, next) {
  res.render("catCollectors/addCat");
}

async function create(req, res, next) {
  try {
    const { name } = req.body;
    const { rows } = await db.query("INSERT INTO cats (name) VALUES ($1)", [
      name,
    ]);
    res.redirect("/catCollectors");
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function deleteCat(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await db.query("DELETE FROM cats WHERE id = $1", [id]);
    res.redirect("/catCollectors");
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const { rows } = await db.query("UPDATE cats SET name = $1 WHERE id = $2", [
      name,
      id,
    ]);
    res.redirect(`/catCollectors/${id}`);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function edit(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await db.query("SELECT * FROM cats WHERE id = $1", [id]);
    res.render("catCollectors/editCat", { id: id, cat: rows[0] });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  index,
  show,
  new: newCat,
  create,
  delete: deleteCat,
  edit,
  update,
};
