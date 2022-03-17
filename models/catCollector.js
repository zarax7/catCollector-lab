const { v4: uuidv4 } = require("uuid");
const catCollection = [{ id: uuidv4(), name: "snow ", done: true }];

function getAll() {
  return catCollection;
}

function getOne(id) {
  const cat = catCollection.find((cat) => cat.id === id);
  return cat;
}

//todoObj => {todo: 'hello world'}
function create(catObj) {
  //uuid will give us a unique value
  catObj.id = uuidv4();
  catCollection.push(catObj);
}

function deleteOne(id) {
  const idx = catCollection.findIndex((cat) => cat.id === id);
  catCollection.splice(idx, 1);
}

function updateOne(id, updatedCat) {
  const idx = catCollection.findIndex((cat) => cat.id === id);
  let catObj = catCollection[idx];
  catObj.cat = updatedCat.cat;
  //   todoObj.done = !!updatedTodo.done;
}

module.exports = {
  getAll, // yes - we can export functions!
  getOne,
  create,
  deleteOne,
  updateOne,
};
