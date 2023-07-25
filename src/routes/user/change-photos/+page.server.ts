import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import kyApi from "$lib/api/kyApi";
import type { TokensResponse } from "$lib/types";
import kyApiSimple from "$lib/api/kyApiSimple";

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
  deletePhoto: async ({ cookies, request }) => {
    const data = await request.formData();

    const photoId = data.get("photoId")?.toString()!;

    try {
      //   if (!cookies.get("accessToken")) {
      //     let tokens: TokensResponse = await kyApiSimple
      //       .get("auth/refresh", {
      //         headers: {
      //           token: cookies.get("refreshToken"),
      //         },
      //       })
      //       .json();
      //     cookies.set("accessToken", tokens.accessToken, {
      //       httpOnly: true,
      //       maxAge: 60 * 15,
      //       path: "/",
      //     });
      //     cookies.set("refreshToken", tokens.refreshToken, {
      //       httpOnly: true,
      //       maxAge: 60 * 60 * 24 * 30,
      //       path: "/",
      //     });
      //   }
      await kyApi(cookies)
        .delete(`photos/${photoId}`, {
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
  uploadPhoto: async ({ cookies, request }) => {
    const data = await request.formData();

    try {
      //   if (!cookies.get("accessToken")) {
      //     let tokens: TokensResponse = await kyApiSimple
      //       .get("auth/refresh", {
      //         headers: {
      //           token: cookies.get("refreshToken"),
      //         },
      //       })
      //       .json();
      //     cookies.set("accessToken", tokens.accessToken, {
      //       httpOnly: true,
      //       maxAge: 60 * 15,
      //       path: "/",
      //     });
      //     cookies.set("refreshToken", tokens.refreshToken, {
      //       httpOnly: true,
      //       maxAge: 60 * 60 * 24 * 30,
      //       path: "/",
      //     });
      //   }
      for (let [key, value] of data.entries()) {
        const photo = new FormData();

        photo.append(key, value);

        await kyApi(cookies)
          .post("photos", {
            headers: {
              Authorization: `Bearer ${cookies.get("accessToken")}`,
              token: cookies.get("refreshToken"),
            },
            body: photo,
          })
          .json();
      }
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
  makePhotoProfile: async ({ cookies, request }) => {
    const data = await request.formData();

    const photoId = data.get("photoId1")?.toString()!;

    try {
      //   if (!cookies.get("accessToken")) {
      //     let tokens: TokensResponse = await kyApiSimple
      //       .get("auth/refresh", {
      //         headers: {
      //           token: cookies.get("refreshToken"),
      //         },
      //       })
      //       .json();
      //     cookies.set("accessToken", tokens.accessToken, {
      //       httpOnly: true,
      //       maxAge: 60 * 15,
      //       path: "/",
      //     });
      //     cookies.set("refreshToken", tokens.refreshToken, {
      //       httpOnly: true,
      //       maxAge: 60 * 60 * 24 * 30,
      //       path: "/",
      //     });
      //   }
      await kyApi(cookies)
        .patch(`photos/makePhotoProfile`, {
          headers: {
            Authorization: `Bearer ${cookies.get("accessToken")}`,
          },
          json: {
            id: +photoId,
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
