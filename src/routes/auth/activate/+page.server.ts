import type { Actions } from "../$types";
import { redirect } from "@sveltejs/kit";
import type { ActivationResponse, TokensResponse } from "$lib/types";
import kyApi from "$lib/api/kyApi";

export const actions: Actions = {
    activation: async ({ cookies, request }) => {
        const data = await request.formData();
        
        const activationCode = data.get('activationCode')?.toString()!;
        
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
                });
                cookies.set('refreshToken', tokens.refreshToken, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 30,
                });
            }
            let activate: ActivationResponse = await kyApi.get(`auth/activate/${activationCode}`, {
                headers: {
                    Authorization: `Bearer ${cookies.get('accessToken')}`,
                    token: cookies.get('refreshToken'),
            }}).json();
        }catch(err: unknown){
            console.log(err);
            
            return;
        }

        throw redirect(301, `/person/50`);
    }
};