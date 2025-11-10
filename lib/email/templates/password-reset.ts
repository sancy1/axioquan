
// /lib/email/templates/password-reset.ts

export function createPasswordResetEmail(resetLink: string, userName?: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 40px;
    }
    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
      color: #374151;
    }
    .message {
      margin-bottom: 30px;
      color: #6b7280;
    }
    .reset-button {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 20px 0;
    }
    .reset-link {
      word-break: break-all;
      background: #f3f4f6;
      padding: 15px;
      border-radius: 6px;
      margin: 20px 0;
      color: #374151;
    }
    .expiry-notice {
      background: #fef3cd;
      border: 1px solid #fde68a;
      border-radius: 6px;
      padding: 15px;
      margin: 20px 0;
      color: #92400e;
    }
    .footer {
      background: #f9fafb;
      padding: 20px;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
    }
    .security-notice {
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 6px;
      padding: 15px;
      margin: 20px 0;
      color: #dc2626;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>AxioQuan</h1>
    </div>
    
    <div class="content">
      <div class="greeting">
        Hi${userName ? ` ${userName}` : ''},
      </div>
      
      <div class="message">
        You requested to reset your password for your AxioQuan account. Click the button below to create a new password:
      </div>
      
      <div style="text-align: center;">
        <a href="${resetLink}" class="reset-button">Reset Your Password</a>
      </div>
      
      <div class="message">
        If the button doesn't work, copy and paste this link into your browser:
      </div>
      
      <div class="reset-link">
        ${resetLink}
      </div>
      
      <div class="expiry-notice">
        <strong>This link will expire in 1 hour.</strong> If you didn't request this reset, you can safely ignore this email.
      </div>
      
      <div class="security-notice">
        <strong>Security Notice:</strong> If you didn't request this password reset, please contact our support team immediately.
      </div>
    </div>
    
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} AxioQuan. All rights reserved.</p>
      <p>This email was sent to you because you requested a password reset for your AxioQuan account.</p>
    </div>
  </div>
</body>
</html>
  `;
}

