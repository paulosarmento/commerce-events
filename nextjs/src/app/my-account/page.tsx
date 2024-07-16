import { gql } from "@apollo/client";
import { getAuthClient, onLogout } from "@faustwp/experimental-app-router";
import { woocommerceClient } from "../lib/wooCommerce";
import { redirect } from "next/navigation";

export default async function MyAccountPage() {
  const client = await getAuthClient();

  if (!client) {
    redirect("/auth/login");
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
  const viewerName = data.viewer.name;

  // Fetch customer information from WooCommerce
  const customersResponse = await woocommerceClient.get(
    "/customers/" + viewerId
  );

  // Fetch orders for the authenticated user
  const ordersResponse = await woocommerceClient.get("/orders", {
    params: {
      customer: viewerId,
    },
  });

  // Fetch products data (optional, if required for the page)
  const productsData = await woocommerceClient.get("/products", {
    params: {
      per_page: 1,
    },
  });

  console.log(customersResponse.data);
  console.log(productsData.data);

  const orders = ordersResponse.data;

  return (
    <>
      <h2>Welcome {viewerName}</h2>

      <h3>My Orders</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Status: {order.status}</p>
          </li>
        ))}
      </ul>
      <h3>My Posts</h3>
      <ul>
        {data.viewer.posts.nodes.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <h3>My Products</h3>
      <ul>
        {productsData.data.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>

      <form action={onLogout}>
        <button type="submit">Logout</button>
      </form>
    </>
  );
}
