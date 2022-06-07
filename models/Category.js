const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pelaporId: [
    {
      type: ObjectId,
      ref: "Pelapor",
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
