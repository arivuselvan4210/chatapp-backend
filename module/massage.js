const mongoose = require("mongoose");

const massageSchema = new mongoose.Schema(
  {
    massage: {
      text: {
        type: String,
        required: true,
      },
    },
    user: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("massage", massageSchema);
