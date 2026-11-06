import { NextResponse } from 'next/server';
import { EmailNotConfigured, escapeHtml, sendEmail } from '@/lib/mailer';

export const runtime = 'nodejs';
const businessTypes = ['Wedding / Event Planner','Event Stylist / Designer','Venue / Hospitality','Floral Designer','Event Production','Corporate Events','Other Event Professional'];
const interests = ['Linens, Napkins & Runners','Chairs & Event Tables','Tabletop, Chargers & Glassware','Full Event Rental Collection','Partnership / Project Collaboration'];

export async function POST(request:Request){
  try {
    if (Number(request.headers.get('content-length') || 0) > 15000) return NextResponse.json({error:'The request is too large.'},{status:413});
    const data:unknown = await request.json();
    if (!data || typeof data !== 'object' || Array.isArray(data)) return NextResponse.json({error:'Invalid form submission.'},{status:400});
    const form=data as Record<string,unknown>;
    const value=(key:string,max:number):string=>typeof form[key]==='string'?(form[key] as string).trim().slice(0,max+1):'';
    const fullName=value('fullName',120), businessName=value('businessName',150), businessType=value('businessType',80);
    const email=value('email',180), phone=value('phone',40), city=value('city',120), websiteOrSocial=value('websiteOrSocial',250);
    const workFocus=value('workFocus',100), details=value('details',1500), website=value('website',100);
    if(website) return NextResponse.json({error:'Unable to process this enquiry.'},{status:400});
    if(fullName.length<2 || fullName.length>120 || businessName.length<2 || businessName.length>150 ||
      !businessTypes.includes(businessType) || !/^\S+@\S+\.\S+$/.test(email) || email.length>180 ||
      !/^[+0-9() .\-]{7,40}$/.test(phone) || city.length<2 || city.length>120 ||
      !interests.includes(workFocus) || websiteOrSocial.length>250 || details.length>1500 || form.consent!==true){
      return NextResponse.json({error:'Please complete the required fields with valid contact details and consent.'},{status:400});
    }
    const fields=[['Full name',fullName],['Business',businessName],['Business type',businessType],['Email',email],['Phone',phone],['City / service area',city],['Website or Instagram',websiteOrSocial || 'Not supplied'],['Rental interest',workFocus],['More information',details || 'Not supplied']];
    const text=fields.map(([label,entry])=>`${label}: ${entry}`).join('\n');
    const html=`<div style="font:15px/1.6 Arial,sans-serif;max-width:660px;padding:24px"><h2>Impress Events — Trade Partnership Enquiry</h2>${fields.map(([label,entry])=>`<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(entry).replaceAll('\n','<br>')}</p>`).join('')}<p><em>The applicant consented to being contacted about this enquiry.</em></p></div>`;
    await sendEmail({subject:`[Impress Events Trade] ${businessName}`,replyTo:email, text, html});
    return NextResponse.json({ok:true});
  } catch(error){
    if(error instanceof EmailNotConfigured) return NextResponse.json({error:'Online applications are not available until email delivery is configured. Please contact Impress Events directly.'},{status:503});
    if(error instanceof SyntaxError) return NextResponse.json({error:'Invalid form submission.'},{status:400});
    console.error('Trade enquiry email error:',error);
    return NextResponse.json({error:'Could not send your enquiry right now. Please try again or contact Impress Events.'},{status:502});
  }
}
