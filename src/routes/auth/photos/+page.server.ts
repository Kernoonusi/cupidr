import kyAuth from "$lib/api/kyAuth";
import { HTTPError } from "ky";
import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {
    uploadPhotos: async ({ request }) => {
        const data = await request.formData();

        try{
            for (let [key, value] of data.entries()) {
                const photo = new FormData()
                photo.append(key, value);
                kyAuth.post('photos', {body: photo});
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