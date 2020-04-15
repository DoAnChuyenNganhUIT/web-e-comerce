var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      default: "",
    },
    Create_date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "category" }
);

categorySchema.path("name").set(function (input) {
  return input[0].toUpperCase() + input.slice(1);
});

module.exports = mongoose.model("Category", categorySchema);
