const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
  <html>

  <head>
	  <meta charset="UTF-8">
	  <title>Verification Code</title>
	  <style>
		  body {
			  font-family: Arial, sans-serif;
			  text-align: center;
			  background-color: #f5f5f5;
			  margin: 0;
			  padding: 20px;
		  }
  
		  img {
			  max-width: 100%;
			  height: auto;
			  margin-bottom: 20px;
		  }
  
		  h2 {
			  color: #333333;
			  font-weight: normal;
			  margin: 0;
		  }
  
		  h1 {
			  color: #FFD60A;
			  font-size: 48px;
			  margin: 10px 0;
		  }
  
		  .container {
			  max-width: 600px;
			  margin: 0 auto;
			  background-color: #ffffff;
			  padding: 20px;
			  border-radius: 10px;
			  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		  }
	  </style>
  </head>
  
  <body>
	  <div class="container">
		  <img src="https://alleshealth.com/wp-content/uploads/2021/03/AllesHealth-1.png" alt="ALLES HEALTH" />
		  <h2>Hi there,</h2>
		  <h2>Your verification code is:</h2>
		  <h1>${otp}</h1>
		  <h2>Best regards,</h2>
		  <h2>Alles Health</h2>
	  </div>
  </body>
  
  </html>`;
};
module.exports = otpTemplate;
