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
  deletePhoto: async ({ cookies, request }) => {
    const data = await request.formData();

    const photoId = data.get("photoId")?.toString()!;

    try {
      await kyApi(cookies).delete(`photos/${photoId}`);
    } catch (error: any) {
      console.log(error);
      console.log(error.status);

      const message = (await error.response)
        ? error.response
            .clone()
            .json()
            .then((obj: any) => JSON.stringify(obj))
        : JSON.stringify({ message: "Something went wrong" });
      return fail(422, {
        error: await JSON.parse(message).message,
      });
    }
  },
  uploadPhoto: async ({ cookies, request }) => {
    const data = await request.formData();

    try {
      for (let [key, value] of data.entries()) {
        console.log("photo sent " + key + " " + value);

        let photo = new FormData();
        photo.append(key, value);

        await kyApi(cookies).post("photos", {
          body: photo,
        });
      }
    } catch (error: any) {
      console.log(error);
      console.log(error.status);

      const message = (await error.response)
        ? error.response
            .clone()
            .json()
            .then((obj: any) => JSON.stringify(obj))
        : JSON.stringify({ message: "Something went wrong" });
      return fail(422, {
        error: await JSON.parse(message).message,
      });
    }
  },
  makePhotoProfile: async ({ cookies, request }) => {
    const data = await request.formData();

    const photoId = data.get("photoId1")?.toString()!;

    try {
      await kyApi(cookies)
        .patch(`photos/makePhotoProfile`, {
          json: {
            id: +photoId,
          },
        });
    } catch (error: any) {
      console.log(error);
      console.log(error.status);

      const message = (await error.response)
        ? error.response
            .clone()
            .json()
            .then((obj: any) => JSON.stringify(obj))
        : JSON.stringify({message: "Something went wrong"});
      return fail(422, {
        error: await JSON.parse(message).message,
      });
    }
  },
};
