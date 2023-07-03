import kyApi from "$lib/api/kyApi";
import type { Actions } from "../$types";
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {
    activation: async ({ request }) => {
        const data = await request.formData();
        
        // TODO: make ky request for activation
        let activate: any = await kyApi.post('/auth/activate', {json: data}).json();
        if(activate.state.status === '404'){
            console.log(activate.error_message);
            
            throw new Error(activate.error_message);
        }

        throw redirect(301, `/person/50`);
    }
};