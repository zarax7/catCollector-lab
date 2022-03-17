const db = require("../config/database");

async function index(req, res, next) {
  try {
    const { rows } = await db.query("SELECT * FROM toys");
    res.render("index", { toy: rows });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await db.query("SELECT * FROM toys WHERE id =$1", [id]);
    res.render("toyCollectors/showToy", { toys: rows[0] });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

function newToy(req, res, next) {
  res.render("toyCollectors/addToy");
}

async function create(req, res, next) {
  try {
    const { name } = req.body;
    const { rows } = await db.query("INSERT INTO toys (name) VALUES ($1)", [
      name,
    ]);
    res.redirect("/toyCollectors");
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function deleteToy(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await db.query("DELETE FROM toys WHERE id = $1", [id]);
    res.redirect("/toyCollectors");
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
    res.redirect(`/toyCollectors/${id}`);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function edit(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await db.query("SELECT * FROM toys WHERE id = $1", [id]);
    res.render("toyCollectors/editToy", { id: id, toy: rows[0] });
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
};
