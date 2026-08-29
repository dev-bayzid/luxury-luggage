import React from "react";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Luggage Creation | luxury-luggage Admin",
};

export default function NewProductPage() {
  return (
    <div>
      <ProductForm isEditing={false} />
    </div>
  );
}
