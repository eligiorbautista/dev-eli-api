const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("REST API Created by Eli Bautista for Eli Bautista's Portfolio Website.");
})

// Send message from the website.
app.post('/api/send-message', async (req, res) => {
    try {
        // Send message from Elliana coffee + sweet website.
        const { newName, newEmail, newMessage } = req.body;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PW
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: process.env.EMAIL_RECIEVER,
            subject: 'New message from your portfolio website!',
            text: `Name:\n${newName}\n\nEmail:\n${newEmail}\n\nMessage:\n${newMessage}\n\n\n • This email has been sent to you from your portfolio website. •`
        };
        transporter.sendMail(mailOptions)
            .then((res) => {
                console.log('Email sent: ' + res.response);
            })
            .catch((err) => {
                console.log(err);
            })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error: error })
    }
    //
    try {
        // Notify user who sends the message from the website.
        const { newName, newEmail, newMessage } = req.body;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PW
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: newEmail,
            subject: "New message from Eli Bautista's Portfolio Website! ",
            text: `Dear ${newName},\n\nWe acknowledge the receipt of your message; thank you for reaching out!\nYour message is in our inbox.\n\n\n • You are receiving this message as part of an automated system via Trina Samba's Portfolio Website. Do not reply. •`
        };
        transporter.sendMail(mailOptions)
            .then((res) => {
                console.log('Email sent: ' + res.response);
            })
            .catch((err) => {
                console.log(err);
            })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error: error })
    }
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running at port ${port} ✔`))