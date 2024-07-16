"use server";

import { onLogin, getAuthClient } from "@faustwp/experimental-app-router";
import { redirect } from "next/navigation";

export async function loginAction(prevData: any, formData: FormData) {
  const client = await getAuthClient();

  if (client) {
    redirect("/my-account");
  }

  const res = await onLogin(formData);

  if (res.error) {
    return res;
  }

  redirect("/my-account");
}
