const { v4: uuidv4 } = require("uuid");
const toyCollection = [{ id: uuidv4(), name: " " }];

function getAll() {
  return toyCollection;
}

function getOne(id) {
  const toy = toyCollection.find((i) => i.id === id);
  return toy;
}

function create(toyObj) {
  const idx = toyCollection.findIndex((i) => i.id === id);
  toyObj.id = uuidv4();
  toyCollection.push(toyObj);
}

function deleteOne(id) {
  const idx = toyCollection.findIndex((i) => i.id === id);
  toyCollection.splice(idx, 1);
}

function updateOne(id, toyUpdated) {
  const idx = toyCollection.findIndex((i) => i.id === id);
  const toyObj = toyCollection[idx];
  toyObj.i = toyUpdated.i;
}

module.exports = {
  getAll,
  getOne,
  create,
  delete: deleteOne,
  update: updateOne,
};
