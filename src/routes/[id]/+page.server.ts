import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { UserResponse } from '$lib/types';
import kyApi from '$lib/api/kyApi';

export const load: PageServerLoad = async ({ cookies, params }) => {
    if(cookies.get("refreshToken")){
        let user: UserResponse = await kyApi(cookies)
        .get(`users/${params.id}`)
        .json();       
        return {
            user,
            accessToken: cookies.get("accessToken"),
            refreshToken: cookies.get("refreshToken"),
        };
    }else {
        throw redirect(301, "/auth");
    }
}