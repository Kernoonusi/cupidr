import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import kyApi from "$lib/api/kyApi";
import type { TokensResponse, UserResponse } from "$lib/types";
import kyApiSimple from "$lib/api/kyApiSimple";

export const load: LayoutServerLoad = async ({ cookies }) => {
  if (cookies.get("refreshToken")) {
    try {
      // if (!cookies.get("accessToken")) {
      //   let tokens: TokensResponse = await kyApiSimple
      //     .get("auth/refresh", {
      //       headers: {
      //         token: cookies.get("refreshToken"),
      //       },
      //     })
      //     .json();
      //   cookies.set("accessToken", tokens.accessToken, {
      //     httpOnly: true,
      //     maxAge: 60 * 15,
      //     path: "/",
      //   });
      //   cookies.set("refreshToken", tokens.refreshToken, {
      //     httpOnly: true,
      //     maxAge: 60 * 60 * 24 * 30,
      //     path: "/",
      //   });
      // }      
      let user: UserResponse = await kyApi(cookies)
        .get("users/me")
        .json();       
      return {
        user,
        accessToken: cookies.get("accessToken"),
        refreshToken: cookies.get("refreshToken"),
      };
    } catch (err: unknown) {
      console.log(err);
    }
  } else {
    throw redirect(301, "/auth");
  }
};
