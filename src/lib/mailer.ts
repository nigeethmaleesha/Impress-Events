import nodemailer from 'nodemailer';
const recipient = process.env.QUOTE_TO_EMAIL || 'kamkanamlage394@gmail.com';
export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c] || c));
export class EmailNotConfigured extends Error {constructor(){super('Email delivery is not configured. Set SMTP_USER and SMTP_PASSWORD in your environment.');}}
export async function sendEmail(options:{subject:string;html:string;text:string;replyTo?:string;customerEmail?:string}){
  const {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM} = process.env;
  if (!SMTP_USER || !SMTP_PASSWORD) throw new EmailNotConfigured();
  const port=Number(SMTP_PORT||465);
  const transporter=nodemailer.createTransport({host:SMTP_HOST||'smtp.gmail.com',port,
    secure:process.env.SMTP_SECURE?process.env.SMTP_SECURE==='true':port===465,
    auth:{user:SMTP_USER,pass:SMTP_PASSWORD},connectionTimeout:12000,greetingTimeout:12000,socketTimeout:16000});
  const from=SMTP_FROM?.trim() || SMTP_USER;
  await transporter.sendMail({from,to:recipient,replyTo:options.replyTo,subject:options.subject,
    html:options.html,text:options.text});
  // Acknowledgement is useful, but its failure must never cause a duplicate owner request.
  if (options.customerEmail) {
    try {await transporter.sendMail({from,to:options.customerEmail,subject:'We received your Impress Events rental enquiry',
      text:'Thank you for your rental quotation request. Our team will review your items and get in touch with availability and pricing. This is not a confirmed booking.',
      html:'<div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:24px"><h2>Thank you for getting in touch.</h2><p>We have received your rental quotation request. Our team will review your selected items and respond with availability and pricing.</p><p><strong>Please note:</strong> Your request does not confirm a booking or reserve any rental items.</p><p>Impress Events</p></div>'});}
    catch(e){console.error('Customer acknowledgement failed',e);}
  }
}
