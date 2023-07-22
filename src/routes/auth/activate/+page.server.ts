import type { Actions } from "../$types";
import { redirect, fail } from "@sveltejs/kit";
import type { ActivationResponse, TokensResponse } from "$lib/types";
import kyApi from "$lib/api/kyApi";
import kyApiSimple from "$lib/api/kyApiSimple";

export const actions: Actions = {
  activation: async ({ cookies, request }) => {
    const data = await request.formData();

    const activationCode = data.get("activationCode")?.toString()!;

    try {
      if (!cookies.get("accessToken")) {
        let tokens: TokensResponse = await kyApiSimple
          .get("auth/refresh", {
            headers: {
              token: cookies.get("refreshToken"),
            },
          })
          .json();
        cookies.set("accessToken", tokens.accessToken, {
          httpOnly: true,
          maxAge: 60 * 15,
          path: "/",
        });
        cookies.set("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });
      }
      let activate: ActivationResponse = await kyApiSimple
        .get(`auth/activate/${activationCode}`, {
          headers: {
            Authorization: `Bearer ${cookies.get("accessToken")}`,
            token: cookies.get("refreshToken"),
          },
        })
        .json();
    } catch (error: any) {
      console.log(error);
      console.log(error.status);

      const message = await error.response
        .clone()
        .json()
        .then((obj: any) => JSON.stringify(obj));
      return fail(422, {
        error: await JSON.parse(message).message,
      });
    }

    throw redirect(301, `/person/50`);
  },
};
