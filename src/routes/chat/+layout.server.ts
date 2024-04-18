import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import kyApi from "$lib/api/kyApi";
import type { ChatsResponse, IChat, UserResponse } from "$lib/types";

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  if (cookies.get("refreshToken")) {
    try {
      const user: UserResponse = await kyApi(cookies).get("users/me").json();
      const chats: IChat[] = await kyApi(cookies).get("chat/myChats").json();
      return {
        chats,
        user,
        accessToken: cookies.get("accessToken"),
        refreshToken: cookies.get("refreshToken"),
        url: url.pathname,
      };
    } catch (err: unknown) {
      console.log(err);
    }
  } else {
    throw redirect(301, "/auth");
  }
};
