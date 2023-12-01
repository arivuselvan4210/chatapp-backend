const massage = require("../module/massage");
const Massagemodul = require("../module/massage");
module.exports.mas = async (req, res, next) => {
  try {
    const { massage, from, to } = req.body;
    const data = await Massagemodul.create({
      massage: {
        text: massage,
      },
      user: [from, to],
      sender: from,
    });

    if (data) {
      res.status(200).json(data);
    } else {
      res.json("not ok");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.allmas = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const massages = await Massagemodul.find({
      user: { $all: [from, to] },
    }).sort({ updatedAt: 1 });
    const masmap = massages.map((mas) => ({
      fromself: mas.sender.toString() === from,
      massage: mas.massage.text,
    }));
    res.status(200).json(masmap);
  } catch (error) {
    next(error);
  }
};
