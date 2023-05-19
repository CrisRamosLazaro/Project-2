const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb+srv://igbescobar:NPny962EN6OtzYJr@cluster0.n6tuyxt.mongodb.net/";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const databaseName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
