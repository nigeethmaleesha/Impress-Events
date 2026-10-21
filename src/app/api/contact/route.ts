import { NextResponse } from 'next/server';
import { EmailNotConfigured, escapeHtml, sendEmail } from '@/lib/mailer';
export const runtime='nodejs';
export async function POST(req:Request){
 try{
  if(Number(req.headers.get('content-length')||0)>12000)return NextResponse.json({error:'Request too large.'},{status:413});
  const raw=await req.json();const s=(key:string,max:number)=>typeof raw?.[key]==='string'?raw[key].trim().slice(0,max):'';
  const name=s('name',120),email=s('email',180),subject=s('subject',160),message=s('message',3000),website=s('website',100);
  if(website)return NextResponse.json({error:'Unable to send.'},{status:400});
  if(name.length<2||!/^\S+@\S+\.\S+$/.test(email)||message.length<10)return NextResponse.json({error:'Enter your name, a valid email and a message (at least 10 characters).'},{status:400});
  await sendEmail({subject:`[Impress Events Contact] ${subject||'General enquiry'}`,replyTo:email,
    text:`Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    html:`<div style="font-family:Arial,sans-serif;padding:24px"><h2>New website enquiry</h2><p><b>From:</b> ${escapeHtml(name)} (${escapeHtml(email)})</p><p><b>Subject:</b> ${escapeHtml(subject||'General enquiry')}</p><p>${escapeHtml(message).replaceAll('\n','<br>')}</p></div>`});
  return NextResponse.json({ok:true});
 }catch(e){
  if(e instanceof EmailNotConfigured)return NextResponse.json({error:'Email has not been configured yet.'},{status:503});
  if(e instanceof SyntaxError)return NextResponse.json({error:'Invalid submission.'},{status:400});
  console.error('Contact mail error',e);return NextResponse.json({error:'Could not send your message. Please try again.'},{status:502});
 }
}
