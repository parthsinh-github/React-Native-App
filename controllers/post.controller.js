// post.controller.js
import Post from '../models/post.model.js';
import User from '../models/user.model.js'; // Reference to user model

// Create a post
export const createPost = async (req, res) => {
    try {
        const { title, description, postedBy } = req.body;

        // Validate input
        if (!title || !description || !postedBy) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new post
        const post = new Post({ title, description, postedBy });
        await post.save();

        res.status(201).json({ success: true, post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('postedBy', 'name email'); // Populate postedBy with user details
        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get post by ID
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('postedBy', 'name email');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ success: true, post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update post by ID
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ success: true, post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete post by ID
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
