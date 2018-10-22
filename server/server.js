const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const app = express();
const port = 8080;

mongoClient.connect(
  "mongodb://localhost:27017/",
  function(err, client) {
    const db = client.db("usersdb");
    const collection = db.collection("users");
    let user = { name: "Tom", age: 23 };
    collection.insertOne(user, function(err, result) {
      if (err) {
        return console.log(err);
      }
      console.log(result.ops);
      client.close();
    });
  }
);

require("./app/routes")(app, {});

app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes")(app, {});

app.listen(port, () => {
  console.log("We are live on " + port);
});

app.get("/get_user", (req, res) => {
  console.log(req.query.userId);
  res.send("get_user!");
});

app.get("/get_user_list", (req, res) => {
  console.log(req.query.all);
  res.send("get_user_list!");
});

app.put("/create_user", (req, res) => {
  console.log(req.query.newUser);
  // Здесь будем создавать заметку.
  res.send("put_user");
});

app.delete("/delete_user", (req, res) => {
  console.log(req.query.userId);
  // Здесь будем создавать заметку.
  res.send("delete_user");
});
