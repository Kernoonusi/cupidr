import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import kyApi from "$lib/api/kyApi";
import type { TokensResponse } from "$lib/types";

export const load: PageServerLoad = async ({ parent, cookies }) => {
  if (cookies.get("refreshToken")) {
    try {
      return await parent();
    } catch (err: unknown) {
      console.log(err);
    }
  } else {
    throw redirect(301, "/auth");
  }
};

export const actions: Actions = {
  
};
