import nodemailer from 'nodemailer';
import logger, { logStream } from '../config/logger';

export const sendEmail = (userMailID, token) => {
    const host = process.env.APP_HOST;
    const port = process.env.APP_PORT;
    const api_version = process.env.API_VERSION;
    const transport = nodemailer.createTransport(
        {
            service: "gmail",
            auth: {
                user: process.env.SENDE_ID,
                pass: process.env.PASSWORD
            }
        }
    )
    const mailOption = {
        from: process.env.SENDE_ID,
        to: userMailID,
        subject: "Password Reset Link",
        html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="${host}:${port}/api/${api_version}/users/reset/${token}">click here</a></h1>`
    }

    transport.sendMail(mailOption, (err, info) => {
        const sendEmailInfo = err ? logger.log('error', err) : logger.log('info', info);
        return sendEmailInfo;
    });
}