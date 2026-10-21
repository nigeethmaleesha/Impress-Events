import type { Metadata } from 'next';
import CatalogueClient from '@/components/CatalogueClient';
export const metadata:Metadata={title:'Explore Rental Collection',description:'Browse rental tablecloths, runners, napkins, charger plates, glassware, chairs, tables and event essentials.'};
export default async function Rentals({searchParams}:{searchParams:Promise<{category?:string;q?:string}>}){const params=await searchParams;return <CatalogueClient initialCategory={params.category||'All'} initialQuery={params.q||''}/>}
