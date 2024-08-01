const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3001; // Use PORT environment variable if available

// Middleware to parse URL-encoded bodies and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Route to handle form submissions
app.post('/send-email', (req, res) => {
    //console.log(req.body); // Log the request body to see what's being received

    // Destructure fields from the request body
    const { name, email, contact, gst, type, size } = req.body;

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS  // Your email password
        }
    });

    // Set up email data
    const mailOptions = {
        from: email, // Sender address
        to: process.env.EMAIL_USER, // Recipient address
        subject: 'Contact Form Submission', // Subject line
        text: `Name: ${name}\nEmail: ${email}\nContact No: ${contact}\nGST Number: ${gst}\nType: ${type}\nSize: ${size}` // Plain text body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString()); // Send error response
        }
        res.status(200).send('Email sent: ' + info.response); // Send success response
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
