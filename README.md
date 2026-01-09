# Chat Database App (Express + MongoDB + EJS)

A mini WhatsApp-style **chat database app** built with **Node.js**, **Express**, **MongoDB (Mongoose)**, and **EJS**.  
It demonstrates a clean **CRUD workflow** (Create, View, Edit, Delete) with a modern UI, **delete confirmation modal**, and **toast notifications**.

---

## Tech Stack

- **Node.js**
- **Express**
- **EJS** (Server-side rendering)
- **MongoDB** + **Mongoose**
- **method-override** (to support PUT/DELETE from HTML forms)

---

## Features

- View all chats in a clean card UI
- Create a new chat message
- Edit/update an existing message
- Delete a message with a **confirmation modal**
- Toast notification after delete (`/chats?toast=deleted`)

---

## Project Structure

```text
.
├── Pictures/
│   └── (Screenshots used in this README)
├── models/
│   └── chat.js
├── views/
│   ├── index.ejs
│   ├── new.ejs
│   └── edit.ejs
├── init.js
├── index.js
├── package.json
└── package-lock.json
```

---

## Database Model (Chat Schema)

Each chat document contains:

- `_id` (MongoDB ObjectId)
- `from` (String)
- `to` (String)
- `message` (String)
- `created_at` (Date)

---

## Setup & Run Locally

### 1) Clone the repo
```bash
git clone https://github.com/Tiwari1782/Chat-database-app.git
cd Chat-database-app
```

### 2) Install dependencies
```bash
npm install
```

### 3) Start MongoDB
Make sure MongoDB is running locally:

```bash
mongod
```

### 4) Run the server
```bash
node index.js
```

Server runs on:

- `http://localhost:8080`

---

## Routes (REST)

| Method | Route | Description |
|------:|------|-------------|
| GET | `/` | Root test route |
| GET | `/chats` | Show all chats (index) |
| GET | `/chats/new` | Form to create a new chat |
| POST | `/chats` | Create chat |
| GET | `/chats/:id/edit` | Form to edit chat message |
| PUT | `/chats/:id` | Update chat message |
| DELETE | `/chats/:id` | Delete chat (redirects with toast) |

---

## Demonstration (Screenshots)

This section uses the images in the `Pictures/` folder to show the full CRUD flow.

### 1) Server Start
![Server Start](Pictures/Server%20Start.png)

---

### 2) View All Chats
This screen shows all chats stored in MongoDB (served by `GET /chats`).

![All Chats](Pictures/All%20chats.png)

---

### 3) Open "Add New Chat" Form
Navigate to the new chat form (`GET /chats/new`).

![Add New Chat Form](Pictures/adding%20a%20new%20chat.png)

---

### 4) Chat Added Successfully
After submitting the form, the app creates the chat using `POST /chats` and redirects back to `/chats`.

![Added New Chat](Pictures/Added%20new%20chat.png)

---

### 5) Edit Chat (Before → After)
Open edit page (`GET /chats/:id/edit`) and update the message (`PUT /chats/:id`).

**Before Edit**
![Before Edit](Pictures/before%20edit.png)

**Editing Chat**
![Editing Chat](Pictures/Editing%20chat.png)

**After Edit**
![Edited Chat](Pictures/edited%20chat.png)

---

### 6) Delete Chat (Confirmation Modal)
Delete is performed using `DELETE /chats/:id` with a professional confirmation modal.

![Delete Chat](Pictures/Delete%20chat.png)

---

## Notes / Improvements (Optional)

- Move DB connection string into environment variables (`.env`)
- Add validation + better error handling UI
- Add search + filter on `/chats` (from/to/message)
- Add pagination for large datasets
- Add API routes (`/api/chats`) for frontend/mobile integration

---

## License

NIL - Made by **Prakash**