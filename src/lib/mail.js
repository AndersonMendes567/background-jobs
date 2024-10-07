import nodemailer from 'nodemailer'
import mailConfig from '../config/mail.js'

// Looking to send emails in production? Check out our Email API/SMTP product!
export default nodemailer.createTransport(mailConfig);