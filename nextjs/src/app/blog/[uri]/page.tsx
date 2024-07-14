"use client";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { apolloClient } from "@/app/lib/apolloClient";
import Header from "@/app/components/Header";
import styles from "./Post.module.css";

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
const GET_POST = gql`
  query GetPost($uri: String!) {
    postBy(uri: $uri) {
      title
      content
      uri
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

export default function Blog() {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const uri = window.location.pathname.replace("/", "");
        const response = await apolloClient.query({
          query: GET_POST,
          variables: { uri },
        });
        const postData = response?.data?.postBy;
        setPost(postData);
      } catch (error) {
        console.error("Erro ao fazer a solicitação GraphQL:", error);
      }
    };

    fetchPost();
  }, []);

  return (
    <>
      <Header />
      <main className="relative overflow-y-scroll p-8 pb-20 scrollbar-hide lg:px-16 mt-20">
        <div className="container">
          <main>
            {post ? (
              <article className={styles.post}>
                <h1 className={styles.title}>{post.title}</h1>
                <div
                  className={styles.content}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>
            ) : (
              <p>Carregando...</p>
            )}
          </main>
        </div>
      </main>
    </>
  );
}
