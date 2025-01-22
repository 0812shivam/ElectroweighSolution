
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = async (req, res) => {
    const { name, email, contact, gst, type, size } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nContact No: ${contact}\nGST Number: ${gst}\nType: ${type}\nSize: ${size}`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent: ' + info.response);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};
