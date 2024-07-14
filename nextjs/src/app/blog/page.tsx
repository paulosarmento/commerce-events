"use client";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { apolloClient } from "../lib/apolloClient";
import Header from "../components/Header";
import styles from "./Blog.module.css";

interface Post {
  title: string;
  content: string;
  uri: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
}

const GET_POSTS = gql`
  query GetAllPosts {
    posts {
      nodes {
        title
        uri
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apolloClient.query({ query: GET_POSTS });
        const postsData = response?.data?.posts?.nodes;
        setPosts(postsData);
      } catch (error) {
        console.error("Erro ao fazer a solicitação GraphQL:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <main className="relative overflow-y-scroll p-8 pb-20 scrollbar-hide lg:px-16 mt-20">
        <div className="container">
          <main>
            <div className={styles.grid}>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <a key={post.uri} href={post.uri} className={styles.card}>
                    <div className={styles.cardContent}>
                      <h3 className={styles.title}>{post.title}</h3>
                      <img
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.title}
                        className={styles.image}
                      />
                    </div>
                  </a>
                ))
              ) : (
                <p>No posts available</p>
              )}
            </div>
          </main>
        </div>
      </main>
    </>
  );
}
