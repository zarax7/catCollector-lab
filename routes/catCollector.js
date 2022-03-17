const express = require("express");
const router = express.Router();
const catCtrl = require("../controllers/catCollectors");

router.get("/", catCtrl.index);

router.get("/new", catCtrl.new);

router.get("/:id", catCtrl.show);

router.post("/", catCtrl.create);

router.delete("/:id", catCtrl.delete);

router.get("/:id/edit", catCtrl.edit);

router.put("/:id", catCtrl.update);

module.exports = router;
