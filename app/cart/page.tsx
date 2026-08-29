"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { PageHero } from "@/components/common/PageHero";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/context/ToastContext";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  Sparkles,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    discountAmount,
    discountPercentage,
    couponCode,
    applyCoupon,
    removeCoupon,
    shipping,
    tax,
    total,
    totalItems,
    freeShippingThreshold,
    freeShippingProgress,
  } = useCart();

  const { formatPrice } = useCurrency();
  const { showToast } = useToast();

  const [inputCoupon, setInputCoupon] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [checkoutForm, setCheckoutForm] = useState({
    name: "Lord Alexander Hastings",
    email: "alexander.hastings@concierge.aurelia.com",
    address: "740 Park Avenue, Penthouse B",
    city: "New York",
    country: "United States",
    postalCode: "10021",
  });

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    applyCoupon(inputCoupon);
    setInputCoupon("");
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderComplete(true);
    clearCart();
    showToast("Voyage Suite Confirmed", `Order ${generatedId} placed successfully.`, "success");
  };

  const amountRemaining = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div>
      <PageHero
        badge="Travel Suite"
        title="Your Curated Bagagerie"
        subtitle="Review your selections, apply private client privileges, and arrange white-glove delivery."
        breadcrumbs={[{ label: "Shopping Suite", href: "/cart" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {items.length === 0 && !orderComplete ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your Suite is Empty"
            description="Explore our permanent collection of aluminum and Italian leather luggage to build your bespoke voyage kit."
            actionText="Explore Luggage Catalog"
            actionHref="/shop"
          />
        ) : orderComplete ? (
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200 shadow-luxury text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-accent">
                Private Commission Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary mt-1">
                Thank You for Choosing Aurelia
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2">
                Your order <strong>{orderId}</strong> has been allocated to our Zürich dispatch atelier. You will receive real-time courier tracking details via email.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Recipient:</span>
                <span className="font-semibold text-primary">{checkoutForm.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Delivery Address:</span>
                <span className="font-semibold text-primary">{checkoutForm.address}, {checkoutForm.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Courier Service:</span>
                <span className="font-semibold text-accent-dark">Aurelia White-Glove Express</span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/shop">
                <Button variant="primary" size="md">
                  Continue Exploring
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Cart Items Table */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free shipping bar */}
              <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-sm">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="flex items-center gap-1.5 font-medium text-neutral-700">
                    <Sparkles className="w-4 h-4 text-accent" />
                    {amountRemaining === 0 ? (
                      <span className="text-accent-dark font-semibold">
                        You have unlocked Complimentary White-Glove Courier Delivery!
                      </span>
                    ) : (
                      <span>
                        Add <strong>{formatPrice(amountRemaining)}</strong> more to qualify for Free Global Express Courier
                      </span>
                    )}
                  </span>
                  <span className="font-bold text-neutral-600">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-luxury divide-y divide-neutral-100">
                {items.map((item) => (
                  <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-6 items-center sm:items-start justify-between">
                    {/* Thumbnail */}
                    <div className="relative w-28 h-32 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <Link
                        href={`/product/${item.slug}`}
                        className="text-base font-bold text-primary hover:text-accent transition-colors"
                      >
                        {item.name}
                      </Link>

                      <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <span
                            className="w-3 h-3 rounded-full border border-neutral-300 inline-block"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          {item.color.name}
                        </span>
                        <span>•</span>
                        <span>{item.size}</span>
                      </div>

                      <div className="text-sm font-semibold text-primary">
                        {formatPrice(item.price)} each
                      </div>
                    </div>

                    {/* Qty & Line Total */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                      <span className="text-base font-extrabold text-primary">
                        {formatPrice(item.price * item.quantity)}
                      </span>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-neutral-200 rounded-full px-2.5 py-1 bg-neutral-50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-neutral-400 hover:text-primary transition-colors"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-primary">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-neutral-400 hover:text-primary transition-colors"
                            aria-label="Increase"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-neutral-400 hover:text-red-500 transition-colors rounded-full hover:bg-neutral-100"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Summary Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-luxury space-y-6">
                <h3 className="text-base font-bold text-primary uppercase tracking-wider">
                  Order Summary
                </h3>

                {/* Promo Code Box */}
                {couponCode ? (
                  <div className="flex items-center justify-between bg-accent/10 border border-accent/30 rounded-2xl p-3 text-xs">
                    <div className="flex items-center gap-2 text-accent-dark font-medium">
                      <Tag className="w-4 h-4" />
                      <span>
                        Privilege: <strong>{couponCode}</strong> ({discountPercentage}% Off)
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-neutral-400 hover:text-red-500 text-xs transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Privilege voucher code"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="flex-1 bg-neutral-50 border border-neutral-200 rounded-full px-4 py-2 text-xs text-primary focus:outline-none focus:border-accent"
                    />
                    <Button type="submit" variant="secondary" size="sm">
                      Apply
                    </Button>
                  </form>
                )}

                {/* Breakdown Rows */}
                <div className="space-y-2.5 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-semibold text-primary">{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Privilege Discount ({discountPercentage}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>White-Glove Express Courier</span>
                    <span className="font-semibold text-primary">
                      {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Customs & Taxes</span>
                    <span className="font-semibold text-primary">{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-primary border-t border-neutral-200 pt-3">
                    <span>Grand Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full py-4 text-xs uppercase tracking-widest font-bold"
                  onClick={() => setIsCheckingOut(true)}
                >
                  <span>Proceed to Private Checkout</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <div className="space-y-2 text-[11px] text-neutral-400 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                    <span>256-Bit SSL Encrypted Private Checkout</span>
                  </div>
                  <div>100-Day Risk-Free Trial & Lifetime Warranty included</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <Modal
        isOpen={isCheckingOut}
        onClose={() => setIsCheckingOut(false)}
        title="Private Client Express Checkout"
        subtitle={`Suite Value: ${formatPrice(total)} • Encrypted`}
        maxWidth="2xl"
      >
        <form onSubmit={handleSimulatePayment} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={checkoutForm.name}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-primary focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                Email for Concierge Tracking
              </label>
              <input
                type="email"
                required
                value={checkoutForm.email}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-primary focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
              Destination Address
            </label>
            <input
              type="text"
              required
              value={checkoutForm.address}
              onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
              className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-primary focus:outline-none focus:border-accent"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                City
              </label>
              <input
                type="text"
                required
                value={checkoutForm.city}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-primary focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                Country
              </label>
              <input
                type="text"
                required
                value={checkoutForm.country}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, country: e.target.value })}
                className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-primary focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                Postal Code
              </label>
              <input
                type="text"
                required
                value={checkoutForm.postalCode}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, postalCode: e.target.value })}
                className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-primary focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-neutral-700">
              <Lock className="w-4 h-4 text-accent" />
              <span>Simulated VIP Payment Method: <strong>Aurelia Black Concierge Card (•••• 8820)</strong></span>
            </div>
            <span className="font-bold text-primary">{formatPrice(total)}</span>
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => setIsCheckingOut(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="gold" size="md" className="px-8 font-bold">
              Authorize & Complete Commission
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
