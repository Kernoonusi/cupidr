import { redirect} from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import kyApi from '$lib/api/kyApi';
import type { TokensResponse, UserResponse } from '$lib/types';

export const load: PageServerLoad = async ({ cookies }) => {
    if(cookies.get('refreshToken')){
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
            let user: UserResponse = await kyApi.get('users/me', {
                headers: {
                    Authorization: `Bearer ${cookies.get('accessToken')}`,
                    token: cookies.get('refreshToken'),
                },
            }).json();
            return {user,
                accessToken: cookies.get('accessToken'),
                refreshToken: cookies.get('refreshToken'),
            };
        }catch(err: unknown){
            console.log(err);
        }
    }
    else{
        throw redirect(301, '/auth');
    }
}