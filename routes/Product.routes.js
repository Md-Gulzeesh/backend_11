const express = require("express");
const { ProductModel } = require("../models/Product.model");
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await ProductModel.find();
  res.send(products);
});
productRouter.get("/bookmarks", async (req, res) => {
  const products = await ProductModel.find({Bookmark:true});
  res.send(products);
});

productRouter.get("/:productID", async (req, res) => {
  ProductModel.findById(req.params.productID, (err, data) => {
    if (err) {
      res.status(404).send(`Product with id ${req.params.productID} not found`);
    } else {
      res.send(data);
    }
  });
});

productRouter.post("/add", async (req, res) => {
  let dateAndTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  req.body.Date_and_TimeStamp = dateAndTime;
  await ProductModel.insertMany([req.body]);
  res.send("Product added successfully");
});

productRouter.delete("/:productID", (req, res) => {
  ProductModel.findByIdAndDelete(req.params.productID, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(`Product with id ${req.params.productID} deleted successfully`);
    }
  });
});
productRouter.patch("/bookmark/:productID", (req, res) => {
  ProductModel.findById(req.params.productID, async (err) => {
    if (err) {
      res.status(404).send(`Product with id ${req.params.productID} not present`);
    } else {
      await ProductModel.where({ _id: req.params.productID }).updateOne(req.body);
      res.send(`Product with id ${req.params.productID} bookmarked successfully`);
    }
  });
});

module.exports = { productRouter };
