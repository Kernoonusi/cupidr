import { redirect, type Actions, fail } from "@sveltejs/kit";
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
  updateUser: async ({ cookies, request }) => {
    const data = await request.formData();

    const regData = {
      // "email": data.get('user-email')?.toString()!,
      name: data.get("user-name")?.toString()!,
      birthday: new Date(data.get("user-birthday")?.toString()!).toISOString(),
      gender: data.get("user-sex")?.toString()!,
      lfGender: data.get("user-prefer")?.toString()!,
      bio: "",
      geolocation: data.get("user-geo")?.toString()!,
    };

    if (data.get("user-bio")?.toString())
      regData.bio = data.get("user-bio")?.toString()!;

    try {
      await kyApi(cookies)
        .patch("users/me/update", {
          json: regData,
          headers: {
            Authorization: `Bearer ${cookies.get("accessToken")}`,
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
  },
};
