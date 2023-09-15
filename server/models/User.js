// Import the Mongoose library
const mongoose = require("mongoose"); // This line imports the Mongoose library, which is a MongoDB Object Document Mapper (ODM) for Node.js.

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
  {
    // This line defines the user schema using the Mongoose Schema constructor. The schema defines the structure of the data that will be stored in the MongoDB collection.
    // Define the name field with type String, required, and trimmed
    firstName: {
      // This line defines the firstName field in the schema. The field is of type String, is required, and is trimmed.
      type: String, // The type property specifies the data type of the field.
      required: true, // The required property specifies that the field is required and cannot be empty.
      trim: true, // The trim property specifies that the spaces at the beginning and end of the value will be trimmed.
    },
    lastName: {
      // This line defines the lastName field in the schema. The field is of type String, is required, and is trimmed.
      type: String,
      required: true,
      trim: true,
    },
    // Define the email field with type String, required, and trimmed
    email: {
      // This line defines the email field in the schema. The field is of type String, is required, and is trimmed.
      type: String,
      required: true,
      trim: true,
    },

    // Define the password field with type String and required
    password: {
      // This line defines the password field in the schema. The field is of type String and is required.
      type: String,
      required: true,
    },
    additionalDetails: {
      // This line defines the additionalDetails field in the schema. The field is of type mongoose.Schema.Types.ObjectId and is required. It refers to the Profile schema.
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
    token: {
      // This line defines the token field in the schema. The field is of type String.
      type: String,
    },
    image: {
      type: String,
      required: true,
    },

    // Add timestamps for when the document is created and last modified
  },
  { timestamps: true } // This line adds timestamps for when the document is created and last modified.
);

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("user", userSchema); // This line exports the Mongoose model for the user schema. The model is exported with the name user.
