"use client";

import React from "react";
import { useParams } from "next/navigation";
import { ADMIN_PRODUCTS } from "@/data/adminMockData";
import { ProductForm } from "@/components/admin/products/ProductForm";

export default function EditProductPage() {
  const params = useParams();
  const id = params?.id as string;

  const product = ADMIN_PRODUCTS.find((p) => p.id === id) || ADMIN_PRODUCTS[0];

  return (
    <div>
      <ProductForm initialData={product} isEditing={true} />
    </div>
  );
}
