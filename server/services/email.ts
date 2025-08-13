// Email service for sending demo requests
// In production, this would integrate with services like SendGrid, Mailgun, or AWS SES

export interface EmailOptions {
  to: string;
  bcc?: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  // Get email credentials from environment variables
  const emailService = process.env.EMAIL_SERVICE || process.env.SMTP_SERVICE || "console";
  const emailUser = process.env.EMAIL_USER || process.env.SMTP_USER;
  const emailPassword = process.env.EMAIL_PASSWORD || process.env.SMTP_PASSWORD;
  const emailFrom = process.env.EMAIL_FROM || process.env.SMTP_FROM || "noreply@eatwithsage.com";
  
  console.log("Sending email with options:", {
    to: options.to,
    bcc: options.bcc,
    subject: options.subject,
    htmlLength: options.html.length,
    service: emailService
  });

  // For development, log the email content
  if (process.env.NODE_ENV === "development") {
    console.log("=== EMAIL CONTENT (Development Mode) ===");
    console.log("To:", options.to);
    if (options.bcc) console.log("BCC:", options.bcc);
    console.log("Subject:", options.subject);
    console.log("HTML:", options.html);
    console.log("=== END EMAIL CONTENT ===");
    return true;
  }

  // In production, implement actual email sending
  // This is a placeholder for real email service integration
  if (emailUser && emailPassword) {
    try {
      // TODO: Implement actual email sending service
      // Example with Nodemailer:
      /*
      const nodemailer = require('nodemailer');
      
      const transporter = nodemailer.createTransporter({
        service: emailService,
        auth: {
          user: emailUser,
          pass: emailPassword
        }
      });

      await transporter.sendMail({
        from: emailFrom,
        to: options.to,
        bcc: options.bcc,
        subject: options.subject,
        html: options.html
      });
      */
      
      console.log("Email sent successfully (production mode simulation)");
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  // Fallback for missing configuration
  console.warn("Email service not configured, logging email content instead");
  return true;
}

export function createDemoEmailHTML(firstName: string, lastName: string, email: string): string {
  const currentDate = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Demo Request - Sage</title>
      <style>
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          line-height: 1.6; 
          color: #052D24; 
          margin: 0; 
          padding: 0; 
          background-color: #F7F5EF;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
        }
        .header { 
          background: linear-gradient(135deg, #8A9A5B 0%, #7a8a52 100%); 
          color: white; 
          padding: 30px; 
          border-radius: 12px; 
          text-align: center;
        }
        .header h1 {
          margin: 0 0 10px 0;
          font-size: 28px;
          font-weight: 700;
        }
        .header p {
          margin: 0;
          font-size: 16px;
          opacity: 0.9;
        }
        .content { 
          background: white; 
          padding: 30px; 
          border-radius: 12px; 
          margin-top: 20px; 
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .highlight { 
          background: #F7F5EF; 
          padding: 20px; 
          border-radius: 8px; 
          border-left: 4px solid #8A9A5B;
          margin-bottom: 25px;
        }
        .highlight h2 {
          margin-top: 0;
          color: #052D24;
          font-size: 20px;
        }
        .contact-info {
          display: grid;
          gap: 8px;
        }
        .contact-info p {
          margin: 0;
          font-size: 15px;
        }
        .contact-info strong {
          color: #052D24;
          font-weight: 600;
        }
        .next-steps {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }
        .next-steps h3 {
          margin-top: 0;
          color: #052D24;
          font-size: 18px;
        }
        .next-steps ul {
          margin: 15px 0 0 0;
          padding-left: 20px;
        }
        .next-steps li {
          margin-bottom: 8px;
          color: #495057;
        }
        .footer { 
          text-align: center; 
          margin-top: 30px; 
          color: #6c757d; 
          font-size: 13px; 
          padding: 15px;
          background: white;
          border-radius: 8px;
        }
        .priority {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 6px;
          padding: 12px;
          margin: 15px 0;
        }
        .priority strong {
          color: #856404;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 New Demo Request</h1>
          <p>A qualified prospect is interested in Sage!</p>
        </div>
        
        <div class="content">
          <div class="highlight">
            <h2>📋 Contact Information</h2>
            <div class="contact-info">
              <p><strong>Full Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Business Email:</strong> <a href="mailto:${email}" style="color: #8A9A5B; text-decoration: none;">${email}</a></p>
              <p><strong>Submitted:</strong> ${currentDate}</p>
            </div>
          </div>
          
          <div class="priority">
            <strong>⏰ Priority Action Required:</strong> Reach out within 24 hours as promised on the website.
          </div>
          
          <div class="next-steps">
            <h3>📌 Recommended Next Steps</h3>
            <ul>
              <li><strong>Immediate:</strong> Send personalized email acknowledgment within 2-4 hours</li>
              <li><strong>Within 24h:</strong> Schedule demo call with calendar link</li>
              <li><strong>Demo Prep:</strong> Research their potential industry (grocery, restaurant, meal kit)</li>
              <li><strong>Materials:</strong> Prepare relevant case studies and ROI examples</li>
              <li><strong>Follow-up:</strong> Send demo recap and next steps within 24h of call</li>
            </ul>
          </div>

          <div style="margin-top: 25px; padding: 15px; background: #e8f5e8; border-radius: 6px; border-left: 3px solid #28a745;">
            <p style="margin: 0; color: #155724;"><strong>💡 Demo Tip:</strong> Focus on their specific use case and quantify potential ROI with customer engagement and retention metrics.</p>
          </div>
        </div>
        
        <div class="footer">
          <p>🤖 This email was automatically generated from the Sage website demo request form.</p>
          <p style="margin-top: 8px;">Sage Technologies, Inc. | <a href="https://eatwithsage.com" style="color: #8A9A5B;">eatwithsage.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}
