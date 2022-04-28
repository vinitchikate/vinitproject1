const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogsController = require("../controllers/blogsController");
const { validateAuthor,validateBlog } = require("../middleware/middleware");


// Phase I
// Author APIs /authors //Vinit
router.post("/createauthor",validateAuthor, authorController.createauthor);


// POST /blogs //Kirtan
router.post("/createBlogs",validateBlog, blogsController.postBlogs);


// GET /blogs //Amit
router.get("/getBlogs", blogsController.getBlogs);


// PUT /blogs/:blogId //Salman
router.put("/blogs/:blogId", blogsController.updateblogs);


// DELETE /blogs/:blogId //Kirtan
router.delete("/blogs/:blogId", blogsController.deleteBlogs);

// DELETE /blogs?queryParams //Salman
router.delete("/blogsq",blogsController.queryDeleted);



module.exports = router;