import ky from "ky";
import type { Actions } from "./$types";

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
    registration: async ({ cookies, request }) => {
        const data = await request.formData();
        
        let regData = new FormData();

        regData.append('email', data.get('user-email')?.toString()!);
        regData.append('password', data.get('user-pass')?.toString()!);
        regData.append('name', data.get('user-name')?.toString()!);
        regData.append('age', getAge(data.get('user-birthday')?.toString()!));
        regData.append('profileImageUrl', "");

        if(data.get('user-photo')){
            let photo = new FormData();
            photo.append('image', data.get('user-photo')!);
            let photoUrlObj: any = await ky.post('http://localhost:3001/upload', {body: photo}).json();
            regData.set('profileImageUrl', photoUrlObj.imageUrl);
        }

        regData.append('gender', data.get('user-sex')?.toString()!);
        regData.append('lfGender', data.get('user-prefer')?.toString()!);
        regData.append('bio', data.get('user-bio')?.toString()!);
        regData.append('geolocation', data.get('user-geo')?.toString()!);

        let response:any = await ky.post('http://localhost:3001/auth/signUp', {body: regData}).json();

        cookies.set('refreshToken', response.refreshToken, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });
        cookies.set('accessToken', response.accessToken, {
            path: '/',
            maxAge: 60 * 15,
        });
    },
    activate:async ({ request }) => {
        const data = await request.formData();

        //TODO: make ky request for activation
    }
};