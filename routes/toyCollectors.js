const express = require("express");
const router = express.Router();
const toyCtrl = require("../controllers/toyCollectors");

router.get("/", toyCtrl.index);

router.get("/addToy", toyCtrl.new);

router.get("/:id", toyCtrl.show);

router.post("/toyCollectors", toyCtrl.create);

router.delete("/:id", toyCtrl.delete);

router.get("/:id/editToy", toyCtrl.edit);

router.put("/", toyCtrl.update);

module.exports = router;
