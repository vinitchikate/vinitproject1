const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogsController = require("../controllers/blogsController");

// Phase I

// Author APIs /authors //Vinit Chikate
router.post("/createauthor", authorController.createauthor);

// POST /blogs //Kirtan Gajjar
router.post("/blogs", blogsController.postBlogs);

// GET /blogs //Amit Vishvakarma
router.get("/getBlogs", blogsController.getBlogs);

// PUT /blogs/:blogId //Salman Sayyed
router.put("/blogs/:blogId", blogsController.updateblogs);

// DELETE /blogs/:blogId //Kirtan Gajjar
router.delete("/blogs/:blogId", blogsController.deleteBlogs);

// DELETE /blogs?queryParams //Salman Sayyed

module.exports = router;