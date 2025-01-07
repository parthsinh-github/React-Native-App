import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`✅ MongoDB connected: ${conn.connection.host}`.cyan.bold);
    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`.red.bold);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
