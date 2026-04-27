const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

/* ======================
   MIDDLEWARE (IMPORTANT)
====================== */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================
   GET ALL USERS
====================== */
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* ======================
   GET USER BY ID
====================== */
app.get("/users/:id", (req, res) => {
  db.query(
    "SELECT * FROM users WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

/* ======================
   CREATE USER (POST)
====================== */
app.post("/users", (req, res) => {
  const name = req.body?.name;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  db.query(
    "INSERT INTO users (name) VALUES (?)",
    [name],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "User created successfully",
        id: result.insertId,
        name,
      });
    }
  );
});

/* ======================
   UPDATE USER (PUT)
====================== */
app.put("/users/:id", (req, res) => {
  const name = req.body?.name;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  db.query(
    "UPDATE users SET name = ? WHERE id = ?",
    [name, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "User updated successfully",
      });
    }
  );
});

/* ======================
   DELETE USER
====================== */
app.delete("/users/:id", (req, res) => {
  db.query(
    "DELETE FROM users WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "User deleted successfully",
      });
    }
  );
});

/* ======================
   START SERVER
====================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});