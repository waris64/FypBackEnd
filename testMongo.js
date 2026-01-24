import mongoose from 'dotenv/config';
import mongoose_pkg from 'mongoose';
const { connect } = mongoose_pkg;
import dotenv from 'dotenv';
dotenv.config();

console.log("Connecting to:", process.env.MONGO);

async function test() {
    try {
        await connect(process.env.MONGO, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("Connected successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Connection failed:", error);
        process.exit(1);
    }
}

test();
