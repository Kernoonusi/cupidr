import kyApi from "$lib/api/kyApi";
import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import accessToken from "$lib/stores/accessToken";

function getAge(dateString: string) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age.toString();
}

export const actions: Actions = {
    registration: async ({ request }) => {
        const data = await request.formData();
        
        const regData = {
            "email": data.get('user-email')?.toString()!,
            "password": data.get('user-pass')?.toString()!,
            "name": data.get('user-name')?.toString()!,
            "age": +getAge(data.get('user-birthday')?.toString()!),
            "gender": data.get('user-sex')?.toString()!,
            "lfGender": data.get('user-prefer')?.toString()!,
            "bio": "",
            "geolocation": data.get('user-geo')?.toString()!,
        };

        //TODO когда ильяс доделает
        // if(data.get('user-photo')){
        //     
        //     let photoUrlObj: any = await kyApi.post('/upload', {body: photo}).json();
        //     regData.profileImageUrl = photoUrlObj;
        // }

        if(data.get('user-bio')?.toString())
            regData.bio = data.get('user-bio')?.toString()!;

        let response: any = await kyApi.post('/auth/signUp', {json: regData}).json();

        accessToken.set(response.accessToken);

        throw redirect(301, 'activate');
    }
};