import type { Actions } from "../$types";
import { redirect } from "@sveltejs/kit";
import { user } from '$lib/stores/user';
import kyAuth from "$lib/api/kyAuth";
import type { ActivationResponse } from "$lib/types";

export const actions: Actions = {
    activation: async ({ request }) => {
        const data = await request.formData();
        
        const activationCode = data.get('activationCode')?.toString()!;
        
        try{
            let activate: ActivationResponse = await kyAuth.get(`auth/activate/${activationCode}`).json();
            console.log(activate);
             
            user.update((value) => {
                if (value) {
                  return { ...value, email: activate.email, name: activate.name, gender: activate.gender, geolocation: activate.geolocation};
                } else {
                  return value;
                }
            });
        }catch(err: unknown){
            console.log(err);
            
            return;
        }

        throw redirect(301, `/person/50`);
    }
};