"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/legacy/image";
import Header from "@/app/components/Header";
import { getProduct, getProductVariation } from "@/app/service/ProductService";
import { Product } from "@/models";
import { ProductQuantityForm } from "./ProductQuantityForm";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useTheme } from "@mui/material/styles";
import { Button } from "@/app/components/FormButton";

export default function ProductDetailPage({
  params: { id },
}: Readonly<{
  params: { id: string };
}>) {
  const [product, setProduct] = useState<Product | null>(null);
  const [variations, setVariations] = useState<Product[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [stockQuantity, setStockQuantity] = useState<number | null>(null);
  const [stockStatus, setStockStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();

  const fetchProductData = useCallback(async () => {
    try {
      setLoading(true);
      const productData = await getProduct(Number(id));
      setProduct(productData);

      if (productData.type === "variable") {
        const variationsData = await getProductVariation(Number(id));
        setVariations(variationsData);
      }

      const defaultColor =
        productData.attributes.find((attr: any) => attr.name === "Cor")
          ?.options[0] || "";
      const defaultSize =
        productData.attributes.find((attr: any) => attr.name === "Tamanho")
          ?.options[0] || "";
      setSelectedColor(defaultColor);
      setSelectedSize(defaultSize);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const updateStock = useCallback(() => {
    if (!product) return;
    let stock = 0;
    let status = "Sem estoque";

    if (product.type === "variable") {
      const selectedVariation = variations.find((variation) =>
        variation.attributes.every(
          (attr) =>
            (attr.name === "Cor" && attr.option === selectedColor) ||
            (attr.name === "Tamanho" && attr.option === selectedSize)
        )
      );
      if (selectedVariation) {
        stock = selectedVariation.stock_quantity;
        status = stock > 0 ? "Em estoque" : status;
      }
    } else if (product.manage_stock) {
      stock = product.stock_quantity;
      status = stock > 0 ? "Em estoque" : status;
    }

    setStockQuantity(stock);
    setStockStatus(status);
  }, [product, variations, selectedColor, selectedSize]);

  useEffect(() => {
    updateStock();
  }, [updateStock]);

  const filterImages = useCallback(() => {
    if (product?.type === "variable") {
      const selectedVariation = variations.find((variation) =>
        variation.attributes.every(
          (attr) =>
            (attr.name === "Cor" && attr.option === selectedColor) ||
            (attr.name === "Tamanho" && attr.option === selectedSize)
        )
      );
      return [
        ...(selectedVariation?.image ? [selectedVariation.image] : []),
        ...(product.images || []),
      ];
    }
    return product?.images || [];
  }, [product, variations, selectedColor, selectedSize]);

  const currentImages = filterImages();

  const handleImageChange = (direction: "next" | "prev") => {
    setCurrentImageIndex((prevIndex) =>
      direction === "next"
        ? (prevIndex + 1) % currentImages.length
        : (prevIndex - 1 + currentImages.length) % currentImages.length
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  if (loading) {
    return (
      <>
        <Header />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Typography variant="h6" color="white">
            Produto não encontrado.
          </Typography>
        </Box>
      </>
    );
  }

  const colorOptions =
    product.attributes.find((attr) => attr.name === "Cor")?.options || [];
  const sizeOptions =
    product.attributes.find((attr) => attr.name === "Tamanho")?.options || [];

  return (
    <Box>
      <Header />
      <Box mt={20} px={2}>
        <Grid2 container spacing={8}>
          <Grid2 xs={12} md={6}>
            <Box position="relative" sx={{ height: "500px" }}>
              <Box
                position="relative"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Image
                  src={currentImages[currentImageIndex]?.src || ""}
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                  style={{
                    borderRadius: "8px",
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
                {/* setas */}
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                    py: 1,
                  }}
                >
                  <IconButton onClick={() => handleImageChange("prev")}>
                    <ArrowBackIosIcon sx={{ color: "white" }} />
                  </IconButton>
                  <IconButton onClick={() => handleImageChange("next")}>
                    <ArrowForwardIosIcon sx={{ color: "white" }} />
                  </IconButton>
                </Box>
                {/* miniaturas */}
                <Box
                  position="absolute"
                  bottom="0"
                  sx={{
                    display: "flex",
                    gap: 1,
                    overflowX: "auto",
                    mb: 2,
                    maxWidth: "calc(100% - 40px)",
                    whiteSpace: "nowrap",
                    padding: "0 10px",
                  }}
                >
                  {currentImages.map((image, index) => (
                    <Tooltip key={index} title={`Imagem ${index + 1}`} arrow>
                      <IconButton
                        onClick={() => setCurrentImageIndex(index)}
                        sx={{
                          borderRadius: "4px",
                          border:
                            index === currentImageIndex
                              ? `2px solid ${theme.palette.primary.main}`
                              : "2px solid transparent",
                          boxShadow:
                            index === currentImageIndex
                              ? `0 0 5px ${theme.palette.primary.main}`
                              : "none",
                          p: 0,
                          transition: "border 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            border: `2px solid ${theme.palette.primary.main}`,
                          },
                        }}
                      >
                        <Image
                          src={image.src}
                          alt={`Thumbnail ${index + 1}`}
                          width={80}
                          height={80}
                          style={{ objectFit: "cover", borderRadius: "4px" }}
                        />
                      </IconButton>
                    </Tooltip>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid2>
          <Grid2 xs={12} md={6}>
            <Typography variant="h4" color="inherit">
              {product.name}
            </Typography>
            <Typography variant="h6" color="inherit">
              {product.price ? `R$${product.price}` : "Preço não disponível"}
            </Typography>
            {product.type === "variable" && (
              <>
                <Box my={2}>
                  <Typography variant="body1" color="inherit">
                    Cor
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                    {colorOptions.map((color) => (
                      <Button
                        key={color}
                        variant={
                          selectedColor === color ? "primary" : "secondary"
                        }
                        onClick={() => handleColorChange(color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </Box>
                </Box>

                <Box my={2}>
                  <Typography variant="body1" color="inherit">
                    Tamanho
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                    {sizeOptions.map((size) => (
                      <Button
                        key={size}
                        variant={
                          selectedSize === size ? "primary" : "secondary"
                        }
                        onClick={() => handleSizeChange(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </Box>
                </Box>
              </>
            )}
            <Box mt={2}>
              <Typography
                variant="body1"
                sx={{ color: stockStatus === "Em estoque" ? "green" : "red" }}
              >
                {stockStatus === "Em estoque" ? "Disponível" : "Indisponível"}
              </Typography>
              {stockQuantity !== null && (
                <Typography variant="body2" color="inherit">
                  Quantidade em estoque: {stockQuantity}
                </Typography>
              )}
            </Box>
            <Box mt={2}>
              <ProductQuantityForm
                product={product}
                stockQuantity={stockQuantity}
              />
            </Box>
          </Grid2>
          <Box
            sx={{
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              maxWidth: "calc(100% - 40px)",
              padding: "0 20px",
              marginBottom: "44px",
              minHeight: "200px",
              overflow: "auto",
            }}
            mt={4}
          >
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab sx={{ color: "inherit" }} label="Descrição do Produto" />
              <Tab sx={{ color: "inherit" }} label="Especificações" />
            </Tabs>
            {tabIndex === 0 && (
              <Box mt={2}>
                <Typography variant="body1" color="inherit">
                  {product.description || "Descrição não disponível."}
                </Typography>
              </Box>
            )}
            {tabIndex === 1 && (
              <Box mt={2}>
                {product.attributes.map((attribute) => (
                  <Box key={attribute.id} mt={1}>
                    <Typography variant="body1" color="inherit">
                      <strong>{attribute.name}:</strong>{" "}
                      {attribute.options.join(", ")}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Grid2>
      </Box>
    </Box>
  );
}
