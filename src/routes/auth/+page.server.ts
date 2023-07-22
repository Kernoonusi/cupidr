import kyApi from "$lib/api/kyApi";
import kyApiSimple from "$lib/api/kyApiSimple";
import type { TokensResponse } from "$lib/types";
import type { Actions } from "./$types";
import { redirect, fail } from "@sveltejs/kit";

export const actions: Actions = {
  registration: async ({ cookies, request }) => {
    const data = await request.formData();

    const regData = {
      email: data.get("user-email")?.toString()!,
      password: data.get("user-password")?.toString()!,
      name: data.get("user-name")?.toString()!,
      birthday: data.get("user-birthday")?.toString()!,
      gender: data.get("user-sex")?.toString()!,
      lfGender: data.get("user-prefer")?.toString()!,
      bio: "",
      geolocation: data.get("user-geo")?.toString()!,
    };

    if (data.get("user-bio")?.toString())
      regData.bio = data.get("user-bio")?.toString()!;

    try {
      let response: TokensResponse = await kyApiSimple
        .post("auth/signUp", { json: regData })
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
    throw redirect(301, "/auth/photos");
  },
};
