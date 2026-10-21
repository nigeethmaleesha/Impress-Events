import type { Metadata } from 'next';
import QuoteForm from '@/components/QuoteForm';
export const metadata:Metadata={title:'Your Quotation Request',description:'Review event rental items and request a personal quotation from Impress Events.'};
export default function QuotePage(){return <QuoteForm/>;}
