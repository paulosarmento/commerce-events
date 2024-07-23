"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import {
  getCategories,
  getProducts,
  getProductsCategory,
} from "../service/ProductService";
import { ProductCard } from "../components/ProductCard";
import { Product } from "../types/product";
import { Categories } from "../types/category";
import { Box, CircularProgress } from "@mui/material";

export default function StorePage() {
  const [categories, setCategories] = useState<Categories>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(8);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesFetch = await getCategories();
      setCategories(categoriesFetch);
    };

    const fetchProducts = async () => {
      const allProducts =
        selectedCategories.length === 0
          ? await getProducts()
          : await Promise.all(
              selectedCategories.map((id) => getProductsCategory(id))
            ).then((results) => results.flat());

      setAllProducts(allProducts);
      setProducts(allProducts);
      setCurrentPage(1);
      setIsLoading(false); // Dados carregados
    };

    fetchCategories();
    fetchProducts();
  }, [selectedCategories]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowCategories(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId]
    );
    setIsLoading(true); // Reiniciar carregamento ao mudar de categoria
  };

  const toggleCategories = () => {
    setShowCategories((prev) => !prev);
  };

  const handlePaginationChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Rolar para o topo ao mudar de página
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <>
      <Header />
      <main className="relative flex flex-col lg:flex-row p-8 pb-20 lg:px-16 mt-20">
        <button
          className="fixed top-16 right-8 bg-blue-500 text-white p-2 rounded-lg shadow-lg z-30 lg:hidden"
          onClick={toggleCategories}
        >
          {showCategories ? "Hide Categories" : "Show Categories"}
        </button>

        <aside
          ref={menuRef}
          className={`fixed top-0 left-0 h-full lg:relative lg:w-1/4 lg:pr-4 mb-8 lg:mb-0 transition-transform transform ${
            showCategories ? "translate-x-0 z-40" : "-translate-x-full"
          } lg:translate-x-0 lg:static bg-white shadow-lg lg:shadow-none lg:bg-transparent lg:flex lg:flex-col lg:items-start lg:gap-4 p-4`}
        >
          <div className="grid gap-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`group relative ${
                  selectedCategories.includes(category.id)
                    ? "bg-blue-300"
                    : "bg-white"
                } w-full overflow-hidden rounded-lg cursor-pointer hover:bg-blue-100`}
                onClick={() => handleCategoryChange(category.id)}
              >
                <div className="flex flex-col justify-between p-4">
                  <p className="text-sm font-medium text-neutral-500 text-center">
                    {category.slug}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section
          className={`w-full lg:w-3/4 transition-opacity duration-300 ${
            showCategories ? "opacity-50" : "opacity-100"
          }`}
        >
          {isLoading ? (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="calc(100vh - 150px)" // Define a altura para centralizar
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
                {currentProducts.map((product, index) => (
                  <Link key={index} href={`/products/${product.id}`}>
                    <ProductCard product={product} />
                  </Link>
                ))}
              </div>

              {products.length > productsPerPage && (
                <div className="flex justify-center mt-8">
                  <nav className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePaginationChange(index + 1)}
                        className={`px-4 py-2 border rounded-lg ${
                          currentPage === index + 1
                            ? "bg-blue-500 text-white"
                            : "bg-white text-blue-500"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </nav>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}
