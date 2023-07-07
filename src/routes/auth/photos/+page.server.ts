import kyApi from "$lib/api/kyApi";
import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {
    uploadPhotos: async ({ cookies, request }) => {
        const data = await request.formData();

        for (let value of data.values()) {
            kyApi.post('photos', {
                headers: {
                    'Authorization': `Bearer ${cookies.get('accessToken')}`,
                },
                body: value});
        }

        throw redirect(301, '/auth/activate');
    }
};