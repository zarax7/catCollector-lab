const db = require("../config/database");

async function index(req, res, next) {
  try {
    const { rows } = await db.query("SELECT * FROM cats");
    res.render("catCollectors/index", { cat: rows });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
async function show(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await db.query("SELECT * FROM cats  WHERE id =$1", [id]);
    res.render("catCollectors/show", { cat: rows[0] });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

function newCat(req, res, next) {
  res.render("catCollectors/new");
}

async function create(req, res, next) {
  try {
    const { name, done } = req.body;
    const { rows } = await db.query(
      "INSERT INTO cats (name, done) VALUES ($1, $2)",
      [name, done]
    );
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
    const { name, done } = req.body;
    const { id } = req.params;
    const { rows } = await db.query(
      "UPDATE cats SET name = $1, done = $2 WHERE id = $3",
      [name, done, id]
    );
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
    res.render("catCollectors/edit", { id: id, cat: rows[0] });
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
