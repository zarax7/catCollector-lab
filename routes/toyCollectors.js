const express = require("express");
const router = express.Router();
const toyCtrl = require("../controllers/toyCollectors");

router.get("/index", toyCtrl.index);

router.get("/addToy", toyCtrl.new);

router.get("/showToy/:id", toyCtrl.show);

router.post("/showToy", toyCtrl.create);

router.delete("/showToy/:id", toyCtrl.delete);

router.get("/showToy/:id/editToy", toyCtrl.edit);

router.put("/showToy/:id", toyCtrl.update);

module.exports = router;
