import React from "react";
import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p>{product.price}</p>
      <a href={product.permalink} target="_blank" rel="noopener noreferrer">
        View Product
      </a>
    </div>
  );
};
