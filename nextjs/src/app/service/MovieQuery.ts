import { gql } from "@apollo/client";
import { apolloClient } from "../lib/apolloClient";
import { pages } from "next/dist/build/templates/app-page";

export async function getStaticProps({ params }: { params: { uri: string } }) {
  const GET_POST_BY_URI = gql`
    query GetPostByURI($id: ID!) {
      post(id: $id, idType: URI) {
        content
        title
        uri
        date
        author {
          node {
            firstName
            lastName
          }
        }
      }
    }
  `;

  try {
    const response = await apolloClient.query({
      query: GET_POST_BY_URI,
      variables: {
        id: params.uri,
      },
    });
    console.log(response);
    const post = response?.data?.post;
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error("Erro ao fazer a solicitação GraphQL:", error);
    return {
      props: {
        post: null,
      },
    };
  }
}
