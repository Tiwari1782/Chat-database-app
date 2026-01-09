const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const port = 8080;
const Chat = require("./models/chat");
const methodoverride = require("method-override")
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
main()
  .then(() => {
    console.log("Connection Successful!!");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
app.get("/", (req, res) => {
  res.send("Root is Working!!");
});
//Index route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
//   console.log(chats);
  // res.send("Working!!");
  res.render("index.ejs", { chats });
});
//New Route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});
//Create Route
app.post("/chats", (req, res) => {
  let { from, to, message } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    message: message,
    created_at: new Date(),
  });
  newChat
    .save()
    .then((res) => {
      console.log("Chat was Saved");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
  // res.send("Working");
});
//Edit Route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});
//Update Route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { message } = req.body;

  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { message: message },
    { runValidators: true, new: true }
  );

  console.log(updatedChat);
  res.redirect("/chats");
});
//Delete Route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);

  res.redirect("/chats?toast=deleted");
});
app.listen(8080, () => {
  console.log(`Server is listening to port ${port}`);
});

// let chat1 = new Chat({
//     from : "Tony",
//     to : "Steve",
//     message : "Its time to meet!!",
//     created_at : new Date() //UTC format
// });

// chat1.save()
//     .then((res) => {
//         console.log(res);
// });
