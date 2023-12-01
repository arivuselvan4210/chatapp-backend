const user = require("../module/user");
// const user = require("../module/user");
const becrpt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // console.log(req.body);
    const hass = await becrpt.hash(password, 10);
    const users = await user.findOne({ username });
    if (users) {
      res.status(403).json({ mas: "alredy user difined" });
    }
    const emailver = await user.findOne({ email });
    if (emailver) {
      res.status(403).json({ msg: "already the email used" });
    }

    const userd = await user.create({
      username,
      email,
      password: hass,
    });
    return res.status(200).json({ status: true, userd });
  } catch (error) {
    console.log(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const usercheck = await user.findOne({ username });

    if (!usercheck) {
      return res.json({ msg: "user not founted", status: false });
    }
    const hash = await becrpt.compare(password, usercheck.password);
    if (!hash) {
      return res.json({ msg: "incrrected password", status: false });
    }
    res.status(200).json({ status: true, usercheck });
  } catch (error) {
    console.log(error);
  }
};

module.exports.setavathar = async (req, res, next) => {
  try {
    const userid = req.params.id;
    const image = req.body.image;
    const userone = await user.findByIdAndUpdate(userid, {
      isAvthar: true,
      isAvtharImg: image,
    });
    res.status(200).json({ userone });
  } catch (error) {
    console.log(error);
  }
};
module.exports.alluser = async (req, res, next) => {
  const users = await user
    .find({ _id: { $ne: req.params.id } })
    .select(["email", " _id", "isAvtharImg", "username"]);
  res.json(users);
};
