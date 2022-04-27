const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogsController = require("../controllers/blogsController");

// Phase I
// Author APIs /authors //Vinit
router.post("/createauthor", authorController.createauthor);


// POST /blogs //Kirtan
router.post("/blogs", blogsController.postBlogs);


// GET /blogs //Amit
router.get("/getBlogs", blogsController.getBlogs);


// PUT /blogs/:blogId //Salman
router.put("/blogs/:blogId", blogsController.updateblogs);


// DELETE /blogs/:blogId //Kirtan


// DELETE /blogs?queryParams //Salman


module.exports = router;