import React from "react";
import Header from "../components/Header";
import { ProductCard } from "../components/ProductCard";

interface ISearchParams {
  title?: string;
  genre?: string;
}

interface ISearchProps {
  searchParams: ISearchParams;
}

export default async function SearchResults({ searchParams }: ISearchProps) {
  const { title, genre } = searchParams;

  const products = await searchProducts(title, genre);

  if (products.length === 0) {
    return (
      <div>
        <div className="relative bg-gradient-to-b pb-8">
          <Header />
          <main className="relative overflow-y-scroll p-8 pb-20 scrollbar-hide lg:px-16 mt-20">
            <h1 className="mb-4 text-2xl font-bold">
              Search results for: <span className="text-red-500">{title}</span>
            </h1>
            <p className="text-xl">No products found</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative bg-gradient-to-b pb-8">
        <Header />
        <main className="relative overflow-y-scroll p-8 pb-20 scrollbar-hide lg:px-16 mt-20">
          <h1 className="mb-4 text-2xl font-bold">
            Search results for: <span className="text-red-500">{title}</span>
          </h1>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 lg:gap-8">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
