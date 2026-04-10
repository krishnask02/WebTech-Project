import app from './app.js';
import connectDB from './infrastructure/db/mongo.js';

const PORT = process.env.PORT || 5000;

// Connect to Database
// connectDB(); // Uncomment when mongo.js is implemented

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
