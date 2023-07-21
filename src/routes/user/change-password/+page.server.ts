import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import kyApi from '$lib/api/kyApi';
import type { TokensResponse, UserResponse } from '$lib/types';

export const load: PageServerLoad = async ({ parent, cookies }) => {
    if(cookies.get('refreshToken')){
        try{
            return await parent();
        }catch(err: unknown){
            console.log(err);
        }
    }
    else{
        throw redirect(301, '/auth');
    }
}

export const actions: Actions = {
    updatePassword: async ({ cookies, request}) => {
        const data = await request.formData();
        
        const regData = {
            password: data.get('user-password')?.toString()!,
        };

        const confPassword = data.get('user-conf-password')?.toString()!

        try{
            if(regData.password !== confPassword) {
                return fail(422, {
                    error: 'Пароли не совпадают',
                });
            }
            await kyApi.patch('users/me/update', {
                json: regData,
                headers: {
                    Authorization: `Bearer ${cookies.get('accessToken')}`,
                }
            }).json();
        }catch (error: any) {
            console.log(error);
            console.log(error.status);

            const message = await error.response.clone().json().then((obj: any) => JSON.stringify(obj));
            return fail(422, {
              error: await JSON.parse(message).message,
            });
        }
    }
};