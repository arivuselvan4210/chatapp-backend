const { mas, allmas } = require("../controler/massage");

const router = require("express").Router();

router.post("/addmas", mas);
router.post("/allmas", allmas);
module.exports = router;
