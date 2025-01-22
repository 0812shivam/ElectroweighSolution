const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/tmp'); // Temporary directory for Vercel serverless functions
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('resume');

module.exports = async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        const { name, email, phone, position, whyHire } = req.body;
        const resumePath = req.file.path;

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
            subject: `Application for ${position}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPosition: ${position}\nWhy Hire: ${whyHire}`,
            attachments: [
                {
                    filename: req.file.originalname,
                    path: resumePath
                }
            ]
        };

        transporter.sendMail(mailOptions, (error, info) => {
            // Clean up the uploaded file after sending email
            fs.unlinkSync(resumePath);

            if (error) {
                return res.status(500).send(error.toString());
            }
            res.status(200).send('Application submitted successfully!');
        });
    });
};
