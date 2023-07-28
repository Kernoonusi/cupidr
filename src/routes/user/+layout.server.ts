import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import kyApi from "$lib/api/kyApi";
import type { UserResponse } from "$lib/types";

export const load: LayoutServerLoad = async ({ cookies }) => {
	if (cookies.get("refreshToken")) {
		try {
			let user: UserResponse = await kyApi(cookies).get("users/me").json();
			return {
				user,
				accessToken: cookies.get("accessToken"),
				refreshToken: cookies.get("refreshToken"),
			};
		} catch (err: unknown) {
			console.log(err);
		}
	} else {
		throw redirect(301, "/auth");
	}
};
