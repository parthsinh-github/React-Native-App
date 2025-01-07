import express from 'express';
import { createPost, getPosts, getPostById, updatePost, deletePost } from '../controllers/post.controller.js';

const router = express.Router();

// POST: Create a new post
router.post('/createPost', createPost);

// GET: Get all posts
router.get('/getAllPosts', getPosts);

// GET: Get a post by ID
router.get('/:id', getPostById);

// PUT: Update a post by ID
router.put('/:id', updatePost);

// DELETE: Delete a post by ID
router.delete('/:id', deletePost);

export default router;
