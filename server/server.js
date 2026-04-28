const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Routes */
app.use("/api/transmittals", require("./routes/transmittalRoutes"));

/* Health Check */
app.get("/", (req, res) => {
  res.send("API Running");
});

/* MongoDB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    console.log("Connected DB:", mongoose.connection.name);

    /* Localhost Only */
    if (process.env.NODE_ENV !== "production") {
      const PORT = process.env.PORT || 5000;

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  })
  .catch((err) => console.log(err));

module.exports = app;