'use client';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
export type QuoteItem = { productId: string; variant: string; quantity: number };
type QuoteContextValue = {
  items: QuoteItem[];
  hydrated: boolean;
  count: number;
  addItem: (productId:string, variant:string, quantity:number) => void;
  updateQuantity: (productId:string, variant:string, quantity:number) => void;
  removeItem: (productId:string, variant:string) => void;
  clear: () => void;
};
const STORAGE_KEY = 'impress-events-quote-v1';
const QuoteContext = createContext<QuoteContextValue | null>(null);
function clean(items: unknown): QuoteItem[] {
  if (!Array.isArray(items)) return [];
  return items.filter((i): i is QuoteItem => typeof i?.productId==='string' && typeof i?.variant==='string' &&
    typeof i?.quantity==='number' && Number.isInteger(i.quantity) && i.quantity>0 && i.quantity<=999).slice(0,100);
}
export function QuoteProvider({children}:{children: ReactNode}) {
  const [items,setItems]=useState<QuoteItem[]>([]);
  const [hydrated,setHydrated]=useState(false);
  useEffect(()=>{
    try {const raw=localStorage.getItem(STORAGE_KEY);if(raw)setItems(clean(JSON.parse(raw)));}catch{/* Invalid storage is safely ignored */}
    setHydrated(true);
  },[]);
  useEffect(()=>{if(hydrated)try{localStorage.setItem(STORAGE_KEY,JSON.stringify(items));}catch{/* Private browsing quota */}},[items,hydrated]);
  const value=useMemo<QuoteContextValue>(()=>({
    items,hydrated,count:items.reduce((n,i)=>n+i.quantity,0),
    addItem:(productId,variant,quantity)=>setItems(prev=>{
      if (!Number.isInteger(quantity)||quantity<1)return prev;
      const q=Math.min(quantity,999), idx=prev.findIndex(i=>i.productId===productId&&i.variant===variant);
      if(idx<0) return prev.length>=100?prev:[...prev,{productId,variant,quantity:q}];
      return prev.map((i,k)=>k===idx?{...i,quantity:Math.min(999,i.quantity+q)}:i);
    }),
    updateQuantity:(productId,variant,quantity)=>setItems(prev=>prev.map(i=>i.productId===productId&&i.variant===variant?{...i,quantity:Math.min(999,Math.max(1,Math.floor(quantity)||1))}:i)),
    removeItem:(productId,variant)=>setItems(prev=>prev.filter(i=>!(i.productId===productId&&i.variant===variant))),
    clear:()=>setItems([])
  }),[items,hydrated]);
  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}
export function useQuote(){const c=useContext(QuoteContext);if(!c)throw new Error('QuoteProvider missing');return c;}
