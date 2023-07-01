import ky from "ky";
import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {
    activation: async ({ request }) => {
        const data = await request.formData();
        
        // TODO: make ky request for activation
        let activate: any = await ky.post('http://localhost:3001/auth/activate', {json: data}).json();
        if(activate.state.status === '404'){
            console.log(activate.error_message);
            
            throw new Error(activate.error_message);
        }

        throw redirect(301, `/person/50`);
    }
};