"use server";

import { onLogout } from "@faustwp/experimental-app-router";

export async function logoutAction() {
  await onLogout();
}
