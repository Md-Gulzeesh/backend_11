require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { productRouter } = require("./routes/Product.routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/products", productRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Db connected successfully");
  } catch (error) {
    console.log("Error while connecting to db");
    console.log(error);
  }
  console.log(`Server started on port ${process.env.PORT}`);
});
