"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { gql } from "@apollo/client";
import { apolloClient } from "../lib/apolloClient";
import { woocommerceClient } from "../lib/wooCommerce";

interface Post {
  title: string;
  content: string;
  uri: string;
  date: string;
}
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  permalink: string;
}

const GET_POSTS = gql`
  query GetAllPosts {
    posts {
      nodes {
        title
        content
        uri
        date
      }
    }
  }
`;

export const fetchProducts = async () => {
  try {
    const response = await woocommerceClient.get("/products");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos do WooCommerce:", error);
    return [];
  }
};

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await fetchProducts();
      console.log(productsData);
      setProducts(productsData);
    };

    getProducts();
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apolloClient.query({ query: GET_POSTS });
        // console.log(response);
        const postsData = response?.data?.posts?.nodes;
        setPosts(postsData);
      } catch (error) {
        console.error("Erro ao fazer a solicitação GraphQL:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container">
      <main>
        <h1 className="title"> WordPress Next.js Starter</h1>

        <div className="grid">
          {posts.length > 0 ? (
            posts.map((post) => (
              <a key={post.uri} href={post.uri} className="card">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </a>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </main>
      <div className="container">
        <Head>
          <title>WooCommerce Products</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">WooCommerce Products</h1>

          <div className="grid">
            {products.length > 0 ? (
              products.map((product) => (
                <a key={product.id} href={product.permalink} className="card">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                </a>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
