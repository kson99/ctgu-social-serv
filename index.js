const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3001;

const uploadRoute = require("./routes/Upload");
const userRoute = require("./routes/User");
const groupRoute = require("./routes/Chat");
const messageRoute = require("./routes/Message");
const followsRoute = require("./routes/Follows");

app.use(cors());
app.use(express.json());

app.use("/upload", uploadRoute);
app.use("/user", userRoute);
app.use("/chat", groupRoute);
app.use("/message", messageRoute);
app.use("/follows", followsRoute);

app.listen(PORT, (req, res) => {
  console.log(`Server Running on ${PORT} ...`);
});
