import nodemailer from 'nodemailer';

export async function POST(request) {
    const { name, email, subject, message } = await request.json();

 try {
    // Configure your email transport
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // admin@lulunremi.com
        pass: process.env.EMAIL_PASS, // your email password
      },
  });


    // Send the message
    await transporter.sendMail({
      from: `"Lulu & Remi Contact" <${process.env.EMAIL_USER}>`,
      to: "admin@lulunremi.com", // your inbox
      subject: `Contact form: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Message sent!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Email error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to send message." }),
      { status: 500 }
    );
  }
}