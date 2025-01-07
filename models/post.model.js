import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
           
        },
        postedBy: {
            type: mongoose.Schema.ObjectId,
            ref: 'User', // Ensure the User model is referenced correctly
        },
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema); // Correct the model name from 'User' to 'Post'

export default Post;
