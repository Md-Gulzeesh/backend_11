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
productRouter.get("/search", async (req, res) => {
    let query = req.query.q;
    if(query !== undefined){
      let product = await ProductModel.find({Title:{ $regex: query }});
      if(product.length !== 0){
        res.send(product);
      }else{
        res.status(404).send("Product is not available");
      }
    }else{
      res.status(500).send("Please type your query");
    }
});
productRouter.get("/sort", async (req, res) => {
    let query = req.query.q;
    if(query !== undefined){
      if(query === "SortBylatest"){
        let product = await ProductModel.find({}).sort({Date_and_TimeStamp:-1});
        if(product.length !== 0){
          res.send(product);
        }else{
          res.status(404).send("Product is not available");
        }
      }else{
        let product = await ProductModel.find({}).sort({Date_and_TimeStamp: 1});
        if(product.length !== 0){
          res.send(product);
        }else{
          res.status(404).send("Product is not available");
        }

      }
    }else{
      res.status(500).send("Please type your query");
    }
});
productRouter.get("/priority", async (req, res) => {
    let query = req.query.p;
    if (query !== undefined) {
      let product = await ProductModel.find({ Priority: query });
      if (product.length !== 0) {
        res.send(product);
      } else {
        res.status(404).send("Product is not available");
      }
    } else {
      res.status(500).send("Please type your priority");
    }
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
