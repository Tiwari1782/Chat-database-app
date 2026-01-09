# Creating the model

Chat will have : (_id, from, to, message, created_at)
from - string type
to - string type
message - string type
created_at - date type

# index route
GET /chats -> show all chats

# new & create route
GET /chats/new
POST /chats

# Using date
chat.created_at.toString().split(" ")[4]
chat.created_at.toString().split(" ").slice(0,4).join(" ")

# Edit & Update Route
GET /chats/:id/edit
PUT /chats/:id

# Destroy Route
