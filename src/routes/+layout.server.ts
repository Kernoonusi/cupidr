import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
  if (cookies.get("refreshToken")) {
    return { isLoggedIn: true };
  }
  return {};
};
