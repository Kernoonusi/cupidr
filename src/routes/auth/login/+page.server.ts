import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import kyApi from "$lib/api/kyApi";
import type { TokensResponse } from "$lib/types";
import kyApiSimple from "$lib/api/kyApiSimple";

export const actions: Actions = {
  login: async ({ cookies, request }) => {
    const data = await request.formData();

    const logData = {
      email: data.get("user-email")?.toString()!,
      password: data.get("user-pass")?.toString()!,
    };

    let response: TokensResponse = await kyApi(cookies)
      .post("auth/signIn", { json: logData })
      .json();

    cookies.set("accessToken", response.accessToken, {
      httpOnly: true,
      maxAge: 60 * 15,
      path: "/",
    });
    cookies.set("refreshToken", response.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    throw redirect(301, "/user");
  },
};
