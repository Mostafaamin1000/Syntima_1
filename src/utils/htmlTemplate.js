export function htmlTemplate(name, otp) {
  return `
   <!DOCTYPE html>
<html lang="en" style="margin:0; padding:0;">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Mobile OTP Verification</title>
<style>
  body {
    margin: 0; padding: 0; background-color: #f4f4f7; font-family: Arial, sans-serif; color: #333;
  }
  .container {
    max-width: 480px;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }
  h1 {
    font-size: 24px;
    color: #2a2a72;
    margin-bottom: 16px;
  }
  p {
    font-size: 16px;
    line-height: 1.5;
  }
  .otp-code {
    display: inline-block;
    margin-top: 20px;
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 4px;
    color: #2a2a72;
    padding: 12px 24px;
    border: 2px dashed #2a2a72;
    border-radius: 8px;
    user-select: all;
  }
  @media screen and (max-width: 520px) {
    .container {
      padding: 16px;
      margin: 12px;
    }
    h1 {
      font-size: 20px;
    }
    .otp-code {
      font-size: 24px;
      padding: 10px 20px;
    }
  }
</style>
</head>
<body>
  <div class="container" role="main" aria-label="One Time Password Verification Email">
    <h1>Hello ${name},</h1>
    <p>For your OTP verification, please use the One-Time Password (OTP) code below:</p>
    <div class="otp-code" aria-label="Your One Time Password">${otp}</div>
    <p>If you did not request this code, please ignore this email.</p>
    <p>Thank you,<br />ٍSynthima</p>
  </div>
</body>
</html>
  `
}
