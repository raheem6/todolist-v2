const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/mytodolistDB", {
  useNewUrlParser: true,
});

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your Todoist!",
});
const item2 = new Item({
  name: "Hit the + button to add a new list ",
});
const item3 = new Item({
  name: "<--- hit this to delete an item.",
});

const defaultItem = [item1, item2, item3];

// Item.insertMany(defaultItem)
//   .then(() => {
//     console.log("Successfully saved all items to the database");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.get("/", function (req, res) {
  Item.find({})
    .then(() => {
      //or if you need to login all
      res.render("list", { listTitle: "Today", newListItems: defaultItem });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
