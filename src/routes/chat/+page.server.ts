import kyApi from "$lib/api/kyApi";
import type { UserResponse, ChatsResponse } from "$lib/types";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, parent }) => {
	if (cookies.get("refreshToken")) {
		let user: UserResponse;
		if((await parent()).user){
			user = (await parent()).user!;
		}else{
			user = await kyApi(cookies).get("users/me").json();
		}
		let chats: ChatsResponse;
		if((await parent()).chats){
			chats = (await parent()).chats!;
		}else{
			chats = await kyApi(cookies).get("chat/myChats").json();
		}
		return {
			user,
			chats,
			accessToken: cookies.get("accessToken"),
			refreshToken: cookies.get("refreshToken"),
		};
	}
	throw redirect(301, "/auth")
};
