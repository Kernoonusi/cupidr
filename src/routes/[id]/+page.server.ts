import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { UserResponse } from "$lib/types";
import kyApi from "$lib/api/kyApi";

export const load: PageServerLoad = async ({ cookies, params }) => {
  if (cookies.get("refreshToken")) {
    if (params.id == "0") {
      let user: UserResponse = {
        id: 0,
        email: 'example@mail.su',
        name: 'Name',
        birthday: '2000-07-14T00:00:00.000Z',
        gender: 'male',
        lfGender: 'male',
        bio: 'Здесь человек расскажет вам о себе',
        geolocation: 'Челябинск',
        isActivated: true,
        UserPhoto: [
          {
            id: 0,
            userId: 0,
            photoUrl: '',
            isProfile: true,
          },
        ],
      }
      return {
        user,
        isEducation: true,
        accessToken: cookies.get("accessToken"),
        refreshToken: cookies.get("refreshToken"),
      };
    }else {
      let user: UserResponse = await kyApi(cookies)
        .get(`users/${params.id}`)
        .json();
      return {
        user,
        isEducation: false,
        accessToken: cookies.get("accessToken"),
        refreshToken: cookies.get("refreshToken"),
      };
    }
  } else {
    throw redirect(301, "/auth");
  }
};
