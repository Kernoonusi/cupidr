import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import kyApi from "$lib/api/kyApi";

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
  logout: async ({ cookies }) => {
    try {
      await kyApi(cookies).get("auth/logout");
    } catch (err: unknown) {
      console.log(err);
    }
    cookies.delete("accessToken");
    cookies.delete("refreshToken");
    cookies.delete("first-time");
    throw redirect(301, "/auth/login");
  },
};
