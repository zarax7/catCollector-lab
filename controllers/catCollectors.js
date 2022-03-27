const db = require("../config/database");

async function index(req, res, next) {
  try {
    const { rows } = await db.query("SELECT * FROM cats");
    res.render("catCollectors/indexCats", { cats: rows });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
async function show(req, res, next) {
  try {
    const { id } = req.params;
    const { toyName } = req.body;
    const { rows } = await db.query("SELECT * FROM cats  WHERE id =$1", [id]);
    const toys = await db.query("SELECT toys.name FROM toys");
    const cattoy = await db.query("SELECT * FROM cattoy");
    res.render("catCollectors/showCat", {
      cat: rows[0],
      toy: toys.rows,
      cattoy: cattoy.rows,
    });
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
    const { id } = req.params;
    const { rows } = await db.query("INSERT INTO cats (name) VALUES ($1)", [
      name,
    ]);
    res.redirect(`/catCollectors/showCat/${id}`);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function deleteCat(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await db.query("DELETE FROM cats WHERE id = $1", [id]);
    res.redirect("/catCollectors/indexCats");
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
    res.redirect(`/catCollectors/showCat/${id}`);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function edit(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await db.query("SELECT * FROM cats WHERE id = $1", [id]);
    res.render("catCollectors/editCat", { cat: rows[0] });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
async function createToy(req, res, next) {
  try {
    const { toyName } = req.body;
    const { id } = req.params;
    const { rows } = await db.query(
      "INSERT INTO cattoy (cat_id,name) VALUES ($1,$2)",
      [id, toyName]
    );
    res.redirect(`/catCollectors/showCat`);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
// join function to connect toys and cats table => when we add a cat or toy, both indexs will show the same content

module.exports = {
  index,
  show,
  new: newCat,
  create,
  delete: deleteCat,
  edit,
  update,
  createToy,
};
