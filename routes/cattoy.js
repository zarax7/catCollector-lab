const express = require("express");
const router = express.Router();

const cattoyCtrl = require("../controllers/cattoy");

router.get("/showCat/:id", cattoyCtrl.show);
router.post("/showCat", cattoyCtrl.createToy);

module.exports = router;
