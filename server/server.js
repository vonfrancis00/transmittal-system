const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* Middleware */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://transmittal-system.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());

/* Routes */
app.use("/api/transmittals", require("./routes/transmittalRoutes"));

/* Health Check */
app.get("/", (req, res) => {
  res.send("API Running");
});

/* MongoDB + Start Server */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    console.log("Connected DB:", mongoose.connection.name);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Error:", err);
  });