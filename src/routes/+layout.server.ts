import { PUBLIC_APIURL } from "$env/static/public";
import kyApi from "$lib/api/kyApi";
import type { UserResponse } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import type { Actions, LayoutServerLoad } from "./$types";

function avatarSrcSearch(userData: UserResponse) {
  let photoUrl;
  userData.UserPhoto.map((element) => {
    if (element.isProfile) {
      photoUrl = element.photoUrl;
    }
  });
  return PUBLIC_APIURL + photoUrl;
}

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  if (cookies.get("refreshToken")) {
    try {
      let user: UserResponse = await kyApi(cookies).get("users/me").json();
      return {
        isLoggedIn: true,
        url: url.pathname,
        userAvatar: avatarSrcSearch(user),
        accessToken: cookies.get("accessToken"),
        refreshToken: cookies.get("refreshToken"),
      };
    } catch (err: unknown) {
      console.log(err);
    }
  }
  return {};
};
