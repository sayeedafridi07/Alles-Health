const mongoose = require("mongoose"); // Import the Mongoose library
const mailSender = require("../utils/mailSender"); // Import the mailSender function from the utils/mailSender file
const emailTemplate = require("../mail/templates/emailVerificationTemplate"); // Import the emailVerificationTemplate function from the mail/templates/emailVerificationTemplate file

// Define the OTP schema using the Mongoose Schema constructor
const OTPSchema = new mongoose.Schema({
  email: {
    // The email field is of type String and is required.
    type: String,
    required: true,
  },
  otp: {
    // The otp field is of type String and is required.
    type: String,
    required: true,
  },
  createdAt: {
    // The createdAt field is of type Date and is set to the current time by default. It also has an expires property that specifies that the document will be automatically deleted after 5 minutes.
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
  // This function is used to send a verification email to the user.

  // Create a transporter to send emails
  // The transporter is a nodemailer object that is used to send emails.

  // Define the email options
  // The email options are used to specify the recipient, subject, and body of the email.

  // Send the email
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      emailTemplate(otp)
    );
    console.log("Email sent successfully: ", mailResponse.response);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
  console.log("New document saved to database");

  // This hook is executed after the document has been saved to the database.
  // It checks if the document is new and if it is, it sends a verification email to the user.

  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

// Export the OTP model
const OTP = mongoose.model("OTP", OTPSchema);
module.exports = OTP;
