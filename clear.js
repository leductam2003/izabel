const mongoose = require('mongoose');

async function clearDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://leductam2003:011103Tam@cluster0.xerfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useUnifiedTopology: true,
    });

    // Get the database name from the connection
    const dbName = mongoose.connection.name;
    
    // Drop the database to clear all collections
    await mongoose.connection.db.dropDatabase();

    console.log(`Database '${dbName}' has been cleared.`);
    
  } catch (error) {
    console.error('Error clearing database:', error);
  } finally {
    // Close the connection
    await mongoose.disconnect();
  }
}

clearDatabase();
