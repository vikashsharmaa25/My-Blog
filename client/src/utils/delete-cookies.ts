"use server";

import { cookies } from "next/headers";

export async function deleteCookies() {
  const cookieStore = cookies();
  (await cookieStore).delete("accessToken");
  (await cookieStore).delete("refreshToken");
}
