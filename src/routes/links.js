const express = require("express");
const pool = require("../database");
const router = express.Router();
const db = require("../database");

router.get("/add", (req, res) => {
  res.render("links/add");
})

router.post("/add", async (req, res) => {
  const { title, url, description  } = req.body;
  const newLink = {
    title,
    url,
    description
  };
  await db.query("INSERT INTO links set ?", [newLink]);
  res.redirect("/links")
})

router.get("/", async (req, res) => {
  const links = await pool.query("SELECT * FROM links");
  res.render("links/list", { links });
})

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM links WHERE ID = ?", [id]);
  res.redirect("/links")
})

module.exports = router;