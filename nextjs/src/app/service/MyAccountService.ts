import { gql } from "@apollo/client";
import { getAuthClient, onLogout } from "@faustwp/experimental-app-router";
import { woocommerceClient } from "../lib/wooCommerce";

export const fetchMyAccountData = async () => {
  const client = await getAuthClient();

  if (!client) {
    throw new Error("Not authenticated");
  }

  const { data } = await client.query({
    query: gql`
      query GetViewer {
        viewer {
          id
          name
          databaseId
          posts {
            nodes {
              id
              title
            }
          }
        }
      }
    `,
  });

  const viewerId = data.viewer.databaseId;

  const ordersResponse = await woocommerceClient.get("/orders", {
    params: {
      customer: viewerId,
    },
  });

  return {
    viewerName: data.viewer.name,
    posts: data.viewer.posts.nodes,
    orders: ordersResponse.data,
  };
};

export const logoutAction = async () => {
  await onLogout();
};
