const db = require("../config/database");

async function index(req, res, next) {
  try {
    const { rows } = await db.query("SELECT * FROM toys");
    res.render("toys/index", { toy: rows });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function newToy(req, res, next) {
  const { rows } = await db.query("SELECT * FROM toys");
  const { id } = req.body;
  res.render("toys/addToy", { toy: rows[0], id });
}

async function show(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await db.query("SELECT * FROM toys WHERE id =$1", [id]);
    res.render("toys/showToy", { toy: rows[0] });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
async function create(req, res, next) {
  try {
    const { name, color } = req.body;
    const { rows } = await db.query(
      "INSERT INTO toys (name, color) VALUES ($1,$2) RETURNING id",
      [name, color]
    );
    console.log(rows);
    res.redirect(`/toys/showToy/${rows[0].id}`);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function deleteToy(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await db.query("DELETE FROM toys WHERE id = $1", [id]);
    res.redirect("/toys/index");
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const { rows } = await db.query("UPDATE toys SET name = $1 WHERE id = $2", [
      name,
      id,
    ]);
    res.redirect(`/toys/showToy/${id}`);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function edit(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await db.query("SELECT * FROM toys WHERE id = $1", [id]);
    res.render("toys/editToy", { toy: rows[0] });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
async function assignToy(req, res, next) {
  try {
    const { toyName, toy_id } = req.body;
    const { id } = req.params;
    const joined = await db.query(
      "SELECT cats.name AS cat, json_agg(json_build_object('toys', toys.name) ) AS cat_toy FROM toys JOIN cattoy ON cattoy.toy_id = toys.id  JOIN cats ON cats.id = cattoy.cat_id GROUP BY cats.id"
    );
    const { rows } = await db.query(
      " INSERT INTO cattoy (cat_id, toy_id) VALUES ($1, $2) RETURNING cat_id ",
      [id, toy_id]
    );
    res.redirect(`/catCollectors/showCat/${rows[0].cat_id}`);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  index,
  show,
  new: newToy,
  create,
  delete: deleteToy,
  edit,
  update,
  assignToy,
};
