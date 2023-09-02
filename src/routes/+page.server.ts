import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, parent }) => {
  const parentData = await parent();

  return { isLoggedIn: parentData.isLoggedIn};
};
