"use client";

import { ShoppingBag } from "lucide-react";

import { useCart } from "@/context/CartContext";

export default function CartButton(){

const {totalItems,openCart}=useCart();

return(

<button
                onClick={openCart}
                className="relative p-2.5 text-neutral-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
                {totalItems > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-accent text-primary text-[10px] font-bold flex items-center justify-center shadow-sm animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>

)

}