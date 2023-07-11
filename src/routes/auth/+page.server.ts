import kyApi from "$lib/api/kyApi";
import { user } from "$lib/stores/user";
import type { TokensResponse } from "$lib/types";
import type { Actions } from "./$types";
import { redirect, fail } from "@sveltejs/kit";
import { get } from 'svelte/store';

export const actions: Actions = {
    registration: async ({ cookies, request }) => {
        const data = await request.formData();
        
        const regData = {
            "email": data.get('user-email')?.toString()!,
            "password": data.get('user-pass')?.toString()!,
            "name": data.get('user-name')?.toString()!,
            "birthday": data.get('user-birthday')?.toString()!,
            "gender": data.get('user-sex')?.toString()!,
            "lfGender": data.get('user-prefer')?.toString()!,
            "bio": "",
            "geolocation": data.get('user-geo')?.toString()!,
        };

        if(data.get('user-bio')?.toString())
            regData.bio = data.get('user-bio')?.toString()!;

        try{
            let response: TokensResponse = await kyApi.post('auth/signUp', {json: regData}).json();
            user.set({
                email: regData.email,
                name: regData.name,
                profileImageUrl: "",
                gender: regData.gender,
                geolocation: regData.geolocation,
                accessToken: response.accessToken,
            });
            cookies.set('refreshToken', response.refreshToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 30 * 1000,
            })
        }catch (error: any) {
            console.log(error);
            console.log(error.status);

            const message = await error.response.clone().json().then((obj: any) => JSON.stringify(obj));
            return fail(422, {
              error: await JSON.parse(message).message,
            });
        }
        throw redirect(301, '/auth/photos');
    }
};