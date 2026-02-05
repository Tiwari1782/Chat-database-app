const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");

const port = 8080;

// async wrapper
function asyncWrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}

// view setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// db connect
main()
  .then(() => {
    console.log("Connection Successful!!");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}

// root route
app.get("/", (req, res) => {
  res.send("Root is Working!!");
});

// index route
app.get(
  "/chats",
  asyncWrap(async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
  })
);

// new route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// create route
app.post(
  "/chats",
  asyncWrap(async (req, res) => {
    let { from, to, message } = req.body;
    await Chat.create({
      from: from,
      to: to,
      message: message,
      created_at: new Date(),
    });
    res.redirect("/chats");
  })
);

// show route
app.get(
  "/chats/:id",
  asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) return next(new ExpressError(404, "Chat not found"));
    res.render("show.ejs", { chat });
  })
);

// edit route
app.get(
  "/chats/:id/edit",
  asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) return next(new ExpressError(404, "Chat not found"));
    res.render("edit.ejs", { chat });
  })
);

// update route
app.put(
  "/chats/:id",
  asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let { message } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
      id,
      { message: message },
      { runValidators: true, new: true }
    );
    if (!updatedChat) return next(new ExpressError(404, "Chat not found"));
    res.redirect("/chats");
  })
);

// delete route
app.delete(
  "/chats/:id",
  asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    if (!deletedChat) return next(new ExpressError(404, "Chat not found"));
    res.redirect("/chats?toast=deleted");
  })
);

// unknown route
// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page not found"));
// });

app.use((err,req,res,next)=>{
  console.log(err.name);
  next(err);
});

// error middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occured" } = err;
  res.status(status).render("error.ejs", { err: { status, message } });
});

// server start
app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
