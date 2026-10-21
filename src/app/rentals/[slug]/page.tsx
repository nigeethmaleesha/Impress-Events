import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products,getProduct } from '@/lib/catalogue';
import ProductDetailClient from '@/components/ProductDetailClient';
export function generateStaticParams(){return products.map(p=>({slug:p.id}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const product=getProduct(slug);return {title:product?.title||'Product',description:product?.description||'Rental product'};}
export default async function ProductDetail({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=getProduct(slug);if(!p)notFound();return <ProductDetailClient product={p}/>;}
