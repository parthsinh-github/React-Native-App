import User from '../models/user.model.js'; // Fixed import
import bcrypt from 'bcrypt';
// import { expressjwt as jwtMiddleware } from 'express-jwt';  // Middleware for JWT validation
// import jwt from 'jsonwebtoken';  // To sign JWT tokens

// Middleware to check JWT in requests
// const requiresignin = jwt({
//     secret: process.env.JWT_SECRET, // Your secret key from the environment variables
//     algorithms: ['HS256'], // Use HS256 algorithm for JWT verification
// });

// export default requiresignin;

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        const existingUser = await User.findOne({ email }); // Check if user already exists
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before storing it

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: 'Account Created',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        const user = await User.findOne({ email }); // Find user by email
        
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found!',
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password); // Check if passwords match

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Password not matched!',
            });
        }

        // // Generate JWT token
        // const token = jwt.sign(
        //     { id: user._id, email: user.email, role: user.role }, // Payload (user data)
        //     process.env.JWT_SECRET, // Secret key from environment variable
        //     { expiresIn: '1h' } // Token expiration time (1 hour in this case)
        // );

        return res.status(200).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true,
             // Send token in response
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // User ID from URL
        const { name, email, password } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!',
            });
        }

        // Update fields if provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash new password
            user.password = hashedPassword;
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
