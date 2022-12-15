const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Quantity: { type: Number, required: true },
  Date_and_TimeStamp:{type:String,required:true},
  Priority: { type: String, required: true },
  Description: { type: String, required: true },
  Bookmark:{type:Boolean,default:false}
});
const ProductModel = mongoose.model("productData", productSchema);

module.exports = { ProductModel };