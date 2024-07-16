import React from "react";
import Link from "next/link";
import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg">
      <img
        src={product.images[0]?.src}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p>{product.price}</p>
      <Link href={product.permalink}>
        <span className="text-blue-500 hover:underline">View Product</span>
      </Link>
    </div>
  );
};
