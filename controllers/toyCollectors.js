const db = require("../config/database");

async function index(req, res, next) {
  try {
    const { rows } = await db.query("SELECT * FROM toys");
    res.render("toyCollectors/index", { toy: rows });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

function newToy(req, res, next) {
  res.render("toyCollectors/addToy");
}

async function show(req, res, next) {
  try {
    const { toysId } = req.body;
    const { id } = req.params;
    const { rows } = await db.query("SELECT * FROM toys WHERE id =$1", [id]);
    res.render("toyCollectors/showToy", { toy: rows[0], toysId });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
async function create(req, res, next) {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const { rows } = await db.query("INSERT INTO toys (name) VALUES ($1)", [
      name,
    ]);
    res.redirect(`/toyCollectors/showToy/${id}`);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function deleteToy(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await db.query("DELETE FROM toys WHERE id = $1", [id]);
    res.redirect("/toyCollectors/index");
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
    res.redirect(`/toyCollectors/showToy/${id}`);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function edit(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await db.query("SELECT * FROM toys WHERE id = $1", [id]);
    res.render("toyCollectors/editToy", { toy: rows[0] });
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
