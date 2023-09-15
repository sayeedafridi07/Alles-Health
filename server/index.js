// Import the 'express' framework
const express = require("express");

// Create an instance of the Express application
const app = express();

// Importing routes for users and profiles
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");

// Importing and establishing database connection
const database = require("./config/database");

// Middleware for parsing cookies
const cookieParser = require("cookie-parser");

// Middleware for handling CORS (Cross-Origin Resource Sharing)
const cors = require("cors");

// Load environment variables from the .env file
const dotenv = require("dotenv");
dotenv.config();

// Define the port where the server will listen
const PORT = process.env.PORT || 4000;

// Connect to the database
database.connect();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware for parsing cookies in the request
app.use(cookieParser());

// Middleware to handle CORS
app.use(cors());

// Define routes for users and profiles
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);

// Define a default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Alles Health is live",
  });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
