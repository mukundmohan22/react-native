require("./models/User");
require("./models/Tracks");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const tracksRoutes = require("./routes/trackRoutes");
const bodyParser = require("body-parser");
const requireAuth = require("./middlewares/requireAuth");

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(tracksRoutes);

const mongoUri =
  "mongodb+srv://admin:DRJeHdZCE2NePIsY@cluster0.atfjl.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongoes instance");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongo ", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen("3000", () => console.log("Listening on port 3000"));
