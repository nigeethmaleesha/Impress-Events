import type { Metadata } from 'next';
import { QuoteProvider } from '@/context/QuoteContext';
import { Header, Footer } from '@/components/SiteChrome';
import './globals.css';
import './redesign.css';
export const metadata:Metadata={title:{default:'Impress Events | Wedding & Event Rentals',template:'%s | Impress Events'},description:'Explore thoughtfully selected wedding and event rental essentials, including table linen, glassware, chargers, chairs and more. Request a tailored rental quotation.',robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><QuoteProvider><Header/><main>{children}</main><Footer/></QuoteProvider></body></html>}
