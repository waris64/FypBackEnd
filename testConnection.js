import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const testConnection = async () => {
  try {
    console.log('🔄 Testing MongoDB connection...\n');
    console.log('📍 Connecting to:', process.env.MONGO.replace(/\/\/.*:.*@/, '//*****:*****@'));
    
    await mongoose.connect(process.env.MONGO, {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('\n✅ ================================');
    console.log('✅ MongoDB Connection Successful!');
    console.log('✅ ================================\n');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    console.log(`🔌 Port: ${mongoose.connection.port}`);
    console.log(`📡 Ready State: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected'}`);
    
    // Close connection
    await mongoose.connection.close();
    console.log('\n👋 Connection closed successfully\n');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ ================================');
    console.error('❌ MongoDB Connection FAILED!');
    console.error('❌ ================================\n');
    console.error('Error Type:', error.name);
    console.error('Error Message:', error.message);
    
    console.error('\n🔧 Troubleshooting Steps:');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('1. ✓ Check if username/password is correct in .env file');
    console.error('2. ✓ Verify IP is whitelisted (0.0.0.0/0) in MongoDB Atlas → Network Access');
    console.error('3. ✓ Ensure cluster "citrus" is ACTIVE (not paused)');
    console.error('4. ✓ Check if special characters in password are URL-encoded');
    console.error('5. ✓ Verify .env file exists and MONGO variable is set');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Show sanitized connection string for debugging
    if (process.env.MONGO) {
      const sanitized = process.env.MONGO.replace(/\/\/.*:.*@/, '//*****:*****@');
      console.error('🔍 Your connection string format:', sanitized);
    } else {
      console.error('⚠️  MONGO environment variable is not set in .env file!');
    }
    
    process.exit(1);
  }
};

// Run the test
console.log('╔════════════════════════════════════╗');
console.log('║  MongoDB Connection Test Utility   ║');
console.log('╚════════════════════════════════════╝\n');

testConnection();