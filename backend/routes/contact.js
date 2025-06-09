import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `New Message: ${subject}`,
html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Message</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            line-height: 1.6;
        }
        
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .logo {
            width: 60px;
            height: 60px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            margin: 0 auto 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            text-align: center;
        }
        
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .notification-badge {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            display: inline-block;
            margin-bottom: 20px;
        }
        
        .message-card {
            background-color: #f8fafc;
            border-left: 4px solid #667eea;
            padding: 25px;
            margin: 20px 0;
            border-radius: 8px;
        }
        
        .field-group {
            margin-bottom: 20px;
        }
        
        .field-label {
            color: #4a5568;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 5px;
            display: block;
        }
        
        .field-value {
            color: #2d3748;
            font-size: 16px;
            line-height: 1.5;
            background-color: white;
            padding: 12px 15px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
        }
        
        .message-content {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            white-space: pre-wrap;
            font-size: 15px;
            line-height: 1.6;
            color: #2d3748;
        }
        
        .action-buttons {
            text-align: center;
            margin: 30px 0;
        }
        
        .btn {
            display: inline-block;
            padding: 12px 24px;
            margin: 0 10px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 500;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .btn-secondary {
            background-color: #f7fafc;
            color: #4a5568;
            border: 1px solid #e2e8f0;
        }
        
        .footer {
            background-color: #2d3748;
            color: #a0aec0;
            padding: 30px 20px;
            text-align: center;
        }
        
        .footer-content {
            max-width: 500px;
            margin: 0 auto;
        }
        
        .footer h3 {
            color: white;
            margin: 0 0 15px 0;
            font-size: 18px;
        }
        
        .contact-info {
            margin: 20px 0;
            font-size: 14px;
        }
        
        .contact-info a {
            color: #667eea;
            text-decoration: none;
        }
        
        .social-links {
            margin: 20px 0;
        }
        
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #a0aec0;
            text-decoration: none;
            font-size: 12px;
            padding: 8px 12px;
            border: 1px solid #4a5568;
            border-radius: 4px;
            transition: all 0.3s ease;
        }
        
        .footer-note {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #4a5568;
            font-size: 12px;
            opacity: 0.8;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 8px;
            }
            
            .header, .content, .footer {
                padding: 20px 15px;
            }
            
            .message-card {
                padding: 20px 15px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">SG</div>
            <h1>New Contact Message</h1>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="notification-badge">📧 New Message Alert</div>
            
            <p style="color: #4a5568; font-size: 16px; margin-bottom: 25px;">
                You have received a new contact form submission from your website. Please find the details below:
            </p>
            
            <div class="message-card">
                <div class="field-group">
                    <span class="field-label">Full Name</span>
                    <div class="field-value">${name}</div>
                </div>
                
                <div class="field-group">
                    <span class="field-label">Email Address</span>
                    <div class="field-value">
                        <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
                    </div>
                </div>
                
                <div class="field-group">
                    <span class="field-label">Subject</span>
                    <div class="field-value">${subject}</div>
                </div>
                
                <div class="field-group">
                    <span class="field-label">Message</span>
                    <div class="message-content">${message}</div>
                </div>
            </div>
            
            <div class="action-buttons">
                <a href="mailto:${email}?subject=Re: ${subject}" class="btn btn-primary">Reply via Email</a>
                <a href="#" class="btn btn-secondary">View Dashboard</a>
            </div>
            
            <div style="background-color: #fff5f5; border: 1px solid #fed7d7; border-radius: 6px; padding: 15px; margin-top: 25px; font-size: 14px; color: #742a2a;">
                <strong>⚡ Quick Action Required:</strong> This message was sent from your website contact form. Please respond within 24-48 hours for the best customer experience.
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-content">
                <h3>BeingRambo</h3>
                <p style="margin: 10px 0; font-size: 14px;">
                    Professional Web Development & Design Services
                </p>
                <div class="contact-info">
                    <p>📧 <a href="mailto:sanjaygawai2022@gmail.com">sanjaygawai2022@gmail.com</a></p>
                    <p>🌐 <a href="https://yourwebsite.com">www.yourwebsite.com</a></p>
                    <p>📱 +91 7720990081</p>
                </div>
                
                <div class="social-links">
                    <a href="#">LinkedIn</a>
                    <a href="#">GitHub</a>
                    <a href="#">Twitter</a>
                    <a href="#">Portfolio</a>
                </div>
                
                <div class="footer-note">
                    <p>This email was automatically generated from your website contact form.</p>
                    <p>&copy; 2025 Your Brand Name. All rights reserved.</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});

export default router;
