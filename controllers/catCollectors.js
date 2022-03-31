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
    const toys = await db.query("SELECT * FROM toys");
    const { rows } = await db.query("SELECT * FROM cats  WHERE id =$1", [id]);
    const cattoy = await db.query("SELECT * FROM cattoy WHERE cat_id = $1", [
      id,
    ]);
    const joined = await db.query(
      "SELECT cats.name AS cat, json_agg(json_build_object('toys', toys.name) ) AS cat_toy FROM toys JOIN cattoy ON cattoy.toy_id = toys.id  JOIN cats ON cats.id = cattoy.cat_id  WHERE cat_id = $1 GROUP BY cats.id",
      [id]
    );
    console.log(joined.rows[0]);
    res.render("catCollectors/showCat", {
      cat: rows[0],
      toy: toys.rows,
      cattoy: cattoy.rows,
      join: joined.rows[0],
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
    const { name, breed, description, age, toyName } = req.body;
    const { rows } = await db.query(
      "INSERT INTO cats (name, breed, description, age ) VALUES ($1,$2,$3,$4) RETURNING id",
      [name, breed, description, age]
    );
    res.redirect(`/catCollectors/showCat/${rows[0].id}`);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function deleteCat(req, res, next) {
  try {
    const { id } = req.params;
    const cattoy = await db.query("DELETE FROM cattoy WHERE cat_id = $1", [id]);
    const { rows } = await db.query("DELETE FROM cats WHERE id = $1", [id]);
    res.redirect("/catCollectors/indexCats");
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { name, breed, description, age } = req.body;
    const { id } = req.params;
    const { rows } = await db.query(
      "UPDATE cats SET name = $1, breed=$2, description=$3, age=$4 WHERE id = $5",
      [name, breed, description, age, id]
    );
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

module.exports = {
  index,
  show,
  new: newCat,
  create,
  delete: deleteCat,
  edit,
  update,
};
