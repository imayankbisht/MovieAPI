const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

//setup Express
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster.9iwi5.mongodb.net/geekystorage?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
  .then(() => {
    console.log("Database Connected");
  });

//set-up routes

const authRoute = require("./Routes/userRoute");

app.use("/user", authRoute);

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
