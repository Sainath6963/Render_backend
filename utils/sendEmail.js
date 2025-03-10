import nodeMailer from "nodemailer";

export const sendEmail = async (options) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST, // Corrected typo
      port: Number(process.env.SMTP_PORT) || 587, // Ensure it's a number, default to 587
      secure: process.env.SMTP_PORT == "465", // Use secure mode if port is 465
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Your App Name" <${process.env.SMTP_MAIL}>`, // Adds a sender name
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: ", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Email could not be sent.");
  }
};
