import ky from "ky";
import type { Actions } from "./$types";

export const actions: Actions = {
    login:async ({ request }) => {
        const data = await request.formData();
        
    }
}