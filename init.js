const mongoose = require("mongoose");
const Chat = require("./models/chat");

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

let allchats = [
  new Chat({
    from: "Tony",
    to: "Steve",
    message: "Its time to meet!!",
    created_at: new Date()
  }),

  new Chat({
    from: "Steve",
    to: "Tony",
    message: "On my way.",
    created_at: new Date()
  }),

  new Chat({
    from: "Bruce",
    to: "Tony",
    message: "The lab is ready.",
    created_at: new Date()
  }),

  new Chat({
    from: "Natasha",
    to: "Clint",
    message: "Mission briefing at 6.",
    created_at: new Date()
  }),

  new Chat({
    from: "Clint",
    to: "Natasha",
    message: "Roger that.",
    created_at: new Date()
  }),

  new Chat({
    from: "Thor",
    to: "Loki",
    message: "Brother, this ends today.",
    created_at: new Date()
  }),

  new Chat({
    from: "Loki",
    to: "Thor",
    message: "You sound desperate.",
    created_at: new Date()
  }),

  new Chat({
    from: "Peter",
    to: "Tony",
    message: "Mr Stark, I finished the suit upgrade!",
    created_at: new Date()
  }),

  new Chat({
    from: "Tony",
    to: "Peter",
    message: "Good job, kid.",
    created_at: new Date()
  }),

  new Chat({
    from: "Wanda",
    to: "Vision",
    message: "Do you feel it too?",
    created_at: new Date()
  }),

  new Chat({
    from: "Vision",
    to: "Wanda",
    message: "Yes, something is wrong.",
    created_at: new Date()
  }),

  new Chat({
    from: "Sam",
    to: "Bucky",
    message: "You okay out there?",
    created_at: new Date()
  }),

  new Chat({
    from: "Bucky",
    to: "Sam",
    message: "Still fighting.",
    created_at: new Date()
  }),

  new Chat({
    from: "Nick",
    to: "Tony",
    message: "We have a situation.",
    created_at: new Date()
  }),

  new Chat({
    from: "Tony",
    to: "Nick",
    message: "When don’t we?",
    created_at: new Date()
  })
];

Chat.insertMany(allchats);

