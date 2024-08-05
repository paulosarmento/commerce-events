"use server";

import { gql } from "@apollo/client";
import { getAuthClient, onLogout } from "@faustwp/experimental-app-router";

export const getUserName = async () => {
  const client = await getAuthClient();
  if (!client) {
    throw new Error("Not authenticated");
  }

  const { data } = await client.query({
    query: gql`
      query GetViewer {
        viewer {
          name
        }
      }
    `,
  });
  return data.viewer.name;
};
export async function logoutAction() {
  return await onLogout();
}
