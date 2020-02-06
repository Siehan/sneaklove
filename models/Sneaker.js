const mongoose = require("mongoose"); // import mongoose dependencie

const Schema = mongoose.Schema;

//type: [Schema.Types.ObjectId], can be an array
const sneakerSchema = new Schema({
  name: String,
  ref: String,
  sizes: Number,
  price: Number,
  image: String,
  category: { type: String,   enum: ["women", "man", "kids" ] },
  id_tags: {
    type: [Schema.Types.ObjectId] ,
    ref: "Tag",
    required: true
  },
});


const sneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = sneakerModel;