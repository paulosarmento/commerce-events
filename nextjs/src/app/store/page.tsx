"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  CircularProgress,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../components/Header";
import {
  getCategories,
  getProducts,
  getProductsCategory,
} from "../service/ProductService";
import { ProductCard } from "../components/ProductCard";
import { Product } from "../types/product";
import { Categories } from "../types/category";

export default function StorePage() {
  const [categories, setCategories] = useState<Categories>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [noProductsMessage, setNoProductsMessage] = useState<string | null>(
    null
  );
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategories(await getCategories());
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const allProducts =
          selectedCategory !== null
            ? await getProductsCategory(selectedCategory)
            : await getProducts();
        setProducts(allProducts);
        setNoProductsMessage(
          allProducts.length ? null : "No products found in this category."
        );
      } catch (error) {
        console.error("Failed to fetch products", error);
        setNoProductsMessage("Failed to load products.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowCategories(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
    setCurrentPage(1);
    if (showCategories) {
      setShowCategories(false); // Fecha o menu ao selecionar uma categoria
    }
  };

  const toggleCategories = () => setShowCategories((prev) => !prev);
  const handlePaginationChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const indexOfLastProduct = currentPage * 12;
  const currentProducts = products.slice(
    indexOfLastProduct - 12,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / 12);

  return (
    <>
      <Header />
      <Box sx={{ display: "flex", mt: "120px" }}>
        <IconButton
          sx={{
            display: { sm: "none" },
            position: "fixed",
            top: 100,
            right: 16,
            zIndex: 1300,
            color: "white",
          }}
          onClick={toggleCategories}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={showCategories}
          onClose={toggleCategories}
          sx={{
            display: { sm: "none" },
            "& .MuiDrawer-paper": {
              width: 250,
              backgroundColor: "#333",
              color: "white",
            },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <IconButton onClick={toggleCategories} color="inherit">
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {categories.map((category) => (
              <ListItemButton
                key={category.id}
                selected={selectedCategory === category.id}
                sx={{
                  backgroundColor:
                    selectedCategory === category.id
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  "&.Mui-selected": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                  color: "white",
                }}
                onClick={() => handleCategoryChange(category.id)}
              >
                <ListItemText primary={category.name} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
        <Box
          component="nav"
          sx={{
            width: { sm: 240 },
            flexShrink: { sm: 0 },
            display: { xs: "none", sm: "block" },
          }}
        >
          <Drawer
            variant="permanent"
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                top: 120,
                width: 240,
                backgroundColor: "transparent",
                color: "white",
              },
            }}
            open
          >
            <List>
              {categories.map((category) => (
                <ListItemButton
                  key={category.id}
                  selected={selectedCategory === category.id}
                  sx={{
                    backgroundColor:
                      selectedCategory === category.id
                        ? "rgba(255, 255, 255, 0.1)"
                        : "transparent",
                    "&.Mui-selected": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                    color: "white",
                  }}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  <ListItemText primary={category.name} />
                </ListItemButton>
              ))}
            </List>
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
        >
          {isLoading ? (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="calc(100vh - 150px)"
            >
              <CircularProgress />
            </Box>
          ) : noProductsMessage ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="calc(100vh - 150px)"
            >
              <Typography variant="h6">{noProductsMessage}</Typography>
            </Box>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Box display="flex" justifyContent="center" mt={8}>
                <div className="flex items-center space-x-4">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-white text-black"
                      } hover:bg-blue-500 hover:text-white`}
                      onClick={() => handlePaginationChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
