const express = require("express");
const router = express.Router();
const catCtrl = require("../controllers/catCollectors");
//localHost3000/catColletors
router.get("/indexCats", catCtrl.index);

router.get("/addCat", catCtrl.new);

router.get("/showCat/:id", catCtrl.show);

router.post("/showCat", catCtrl.create);

router.delete("/showCat/:id", catCtrl.delete);

router.get("/showCat/:id/editCat", catCtrl.edit);

router.put("/showCat/:id", catCtrl.update);

module.exports = router;
