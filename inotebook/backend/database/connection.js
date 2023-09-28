const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));
