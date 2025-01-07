import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import userRoute from './routes/user.route.js';
import postRoute from './routes/post.route.js';

dotenv.config();

// Connect to database before starting the server
connectDB();

const app = express();

// Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*' // Use environment variable for CORS origin, default to '*'
}));
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined')); // Use 'combined' logging in production

// Routes
app.use('/api/v1/user', userRoute); // Removed extra trailing slash
app.use('/api/v1/post', postRoute); // Removed extra trailing slash

app.get('/home', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'JE baat',
    });
});

// Server Configuration
const PORT =  9000; // Use environment variable for port, fallback to 9000
app.listen(PORT, () => {
    console.log(
        `✅ Server started on ${colors.cyan(`http://localhost:${PORT}`)}`
    );
});

// Global Error Handling (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
    });
});
