const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const sendEMail = async (to, subject, message) => {
  try {
    const emailOptions = {
      from: process.env.EMAIL_SENDER,
      to,
      subject,
      text: message,
    }

    await transporter.sendMail(emailOptions)
  } catch (e) {
    console.error(e)
    return e.message
  }
}

module.exports = sendEMail
