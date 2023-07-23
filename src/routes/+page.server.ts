import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    if(cookies.get("refreshToken")){
        throw redirect(301, '/1')
    }
  return {};
};
