"use server";

import { cookies } from "next/headers";

export async function cookiesAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value || "";
}

export async function cookiesRefreshToken() {
  const cookieStore = await cookies();
  return cookieStore.get("refreshToken")?.value || "";
}
