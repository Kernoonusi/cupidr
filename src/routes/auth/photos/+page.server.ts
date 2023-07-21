import { HTTPError } from "ky";
import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import type { PhotosResponse, TokensResponse } from "$lib/types";
import { env } from "$env/dynamic/public";
import kyApi from "$lib/api/kyApi";

export const actions: Actions = {
    uploadPhotos: async ({ cookies, request }) => {
        const data = await request.formData();

        try{
            if(!cookies.get('accessToken')){
                let tokens: TokensResponse = await kyApi.get('auth/refresh', {
                    headers: {
                        token: cookies.get('refreshToken'),
                    }
                }).json();
                cookies.set('accessToken', tokens.accessToken, {
                    httpOnly: true,
                    maxAge: 60 * 15,
                    path: '/',
                });
                cookies.set('refreshToken', tokens.refreshToken, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 30,
                    path: '/',
                });
            }
            for (let [key, value] of data.entries()) {
                const photo = new FormData()
                photo.append(key, value);

                let response: PhotosResponse = await kyApi.post('photos', {
                    headers: {
                        Authorization: `Bearer ${cookies.get('accessToken')}`,
                        token: cookies.get('refreshToken'),
                    },
                    body: photo,
                }).json();
            }
        }catch(err: unknown){
            if(err instanceof HTTPError){
                return;
            }
            return;
        }
        throw redirect(301, '/auth/activate');
    }
};