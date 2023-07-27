const nodemailer = require('nodemailer')
require('dotenv').config()

const { BASE_URL } = process.env

const sendEmail = async (email, verificationToken) => {
  try {
    // Create a nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email content
    const emailContent = {
      from: 'MihalchenkoYuri1987@gmail.com',
      to: email,
      subject: 'Verify your email, please',
      html: `<h3>You want to sign in?</h3><a style="font-size:16px" target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click this to verify your email</a>`,
    }

    // Send email
    await transporter.sendMail(emailContent)

    return true
  } catch (error) {
    // Handle any errors that occurred during the email sending process
    console.error('Error sending email:', error)
    return false
  }
}

module.exports = sendEmail
