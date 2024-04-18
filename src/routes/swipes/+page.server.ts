import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { UserResponse } from "$lib/types";
import kyApi from "$lib/api/kyApi";

export const load: PageServerLoad = async ({ cookies, parent }) => {
  if (cookies.get("refreshToken")) {
    if (!cookies.get("first-time")) {
      let user: UserResponse = {
        id: 0,
        email: "example@mail.su",
        name: "Имя",
        birthday: "2000-07-14T00:00:00.000Z",
        gender: "male",
        lfGender: "male",
        bio: "Здесь человек расскажет вам о себе",
        geolocation: "Город",
        isActivated: true,
        UserPhoto: [
          {
            id: 0,
            userId: 0,
            photoUrl: "tmp_pkbna_d.png",
            isProfile: true,
          },
          {
            id: 1,
            userId: 0,
            photoUrl: "photo2.png",
            isProfile: false,
          },
        ],
      };
      let user2: UserResponse[] = await kyApi(cookies)
        .get(`matches/myMatches?limit=1`)
        .json();
      cookies.set("first-time", "no");
      let me: UserResponse = await kyApi(cookies).get("users/me").json();
      return {
        user: me,
        matches: [user, user2[0]],
        isEducation: true,
        accessToken: cookies.get("accessToken"),
        refreshToken: cookies.get("refreshToken"),
      };
    } else {
      let matches: UserResponse[] = await kyApi(cookies)
        .get(`matches/myMatches?limit=2`)
        .json();
      let me: UserResponse = await kyApi(cookies).get("users/me").json();
      return {
        user: me,
        matches,
        isEducation: false,
        accessToken: cookies.get("accessToken"),
        refreshToken: cookies.get("refreshToken"),
      };
    }
  } else {
    throw redirect(301, "/auth");
  }
};

export const actions: Actions = {
  like: async ({ cookies, request }) => {
    const data = await request.formData();

    try {
      if (data.get("id")?.toString() !== "0")
        await kyApi(cookies).get(`matches/like/${data.get("id")?.toString()}`);

      let matches: UserResponse[] = await kyApi(cookies)
        .get(`matches/myMatches?limit=1`)
        .json();
      return matches;
    } catch (err: unknown) {
      console.log(err);
    }
  },
  dislike: async ({ cookies, request }) => {
    const data = await request.formData();

    try {
      if (data.get("id")?.toString() !== "0")
        await kyApi(cookies).get(
          `matches/dislike/${data.get("id")?.toString()}`,
        );

      let matches: UserResponse[] = await kyApi(cookies)
        .get(`matches/myMatches?limit=1`)
        .json();
      return matches;
    } catch (err: unknown) {
      console.log(err);
    }
  },
};
