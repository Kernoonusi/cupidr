import ky from "ky";
import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import accessToken from "$lib/stores/accessToken";

export const actions: Actions = {
    login:async ({ request }) => {
        const data = await request.formData();
        
        const logData = {
            "email": data.get('user-email')?.toString()!,
            "password": data.get('user-pass')?.toString()!,
        };

        let response: any = await ky.post('http://localhost:3001/auth/signIn', {json: logData}).json();

        accessToken.set(response.accessToken);

        throw redirect(301, '/person/50');
    }
}