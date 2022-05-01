const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogsController = require("../controllers/blogController");
const { validateAuthor, validateblog } = require('../middleware/valid');
const { Authentication, Authrization } = require('../middleware/auth');

// Kirtan-G
router.post("/blogs", Authentication, validateblog, blogsController.createBlog);
router.delete("/blogs/:blogId", Authentication, Authrization, blogsController.deleteBlogs);

// Salman-110
router.put("/blogs/:blogId", Authrization, blogsController.updateblogs);
router.delete("/blogsq/:blogId", Authentication, Authrization, blogsController.queryDeleted);

//amitvsk
router.get("/blogs", Authentication, blogsController.getBlogs);

// vinitchikate
router.post('/login', authorController.authorLogin);
router.post("/authors", validateAuthor, authorController.createauthor);

module.exports = router;