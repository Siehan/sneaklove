const mongoose = require("mongoose"); // import mongoose dependencie

const Schema = mongoose.Schema;

//type: [Schema.Types.ObjectId], can be an array
const sneakerSchema = new Schema({
  name: String,
  ref: String,
  sizes: Number,
  price: Number,
  category: { type: String,   enum: ["admin", "editor", "user" ] },
  id_tags: {
    type: [Schema.Types.ObjectId] ,
    ref: "Tags",
    required: true
  },
});


const sneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = sneakerModel;