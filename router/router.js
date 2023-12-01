const { register, login, setavathar, alluser } = require("../controler/user");

const router = require("express").Router();

router.post("/rigister", register);
router.post("/login", login);
router.put("/setavathar/:id", setavathar);
router.get("/alluser/:id", alluser);

module.exports = router;
