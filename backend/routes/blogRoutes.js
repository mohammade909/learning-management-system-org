const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authMiddleware');

// Route to create a new blog post
router.post('/blogs', blogsController.createBlog);

// Route to get all blog posts
router.get('/blogs', blogsController.getAllBlogs);

// Route to get a single blog post by ID
router.get('/blogs/:id', blogsController.getBlogById);
router.get('/blogs/user/:user_id', blogsController.getBlogByUser);

// Route to update a blog post by ID
router.put('/blogs/:id', blogsController.updateBlog);

// Route to delete a blog post by ID
router.delete('/blogs/:id',  blogsController.deleteBlog);

module.exports = router;
