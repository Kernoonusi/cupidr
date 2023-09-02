import { HTTPError } from "ky";
import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import type { PhotosResponse, TokensResponse } from "$lib/types";
import { env } from "$env/dynamic/public";
import kyApi from "$lib/api/kyApi";

export const actions: Actions = {
  uploadPhotos: async ({ cookies, request }) => {
    const data = await request.formData();

    try {
      for (let [key, value] of data.entries()) {
        console.log("photo sended");

        const photo = new FormData();
        photo.append(key, value);

        await kyApi(cookies).post("photos", { body: photo }).json();
      }
    } catch (err: unknown) {
      if (err instanceof HTTPError) {
        return;
      }
      return;
    }
    throw redirect(301, "/auth/activate");
  },
};
