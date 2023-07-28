import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  if (cookies.get("refreshToken")) {
    return { isLoggedIn: true, url: url.pathname };
  }
  return {};
};
