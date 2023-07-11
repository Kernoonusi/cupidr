import ky from 'ky';
import { get } from 'svelte/store';
import { user } from '$lib/stores/user'; // assuming you have a user store and a setUser action
import { goto } from '$app/navigation'; // svelte kit navigation
import { APIURL }  from '$env/static/private';
import type { TokensResponse } from '$lib/types';

let tries = 0;

const kyAuth = ky.create({
  prefixUrl: APIURL,
  hooks: {
    beforeRequest: [
      request => {
        const token = get(user)?.accessToken;
        console.log(token);

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (request, _options, response) => {
        if (response.status === 401 && tries <= 1) {
          tries++;
          console.log(response);
          console.log(request);
          try {
            const {accessToken}: TokensResponse = await kyAuth.get('auth/refresh').json();
            console.log(accessToken);
            
            user.update((value) => {
              if (value) {
                return { ...value, accessToken: accessToken };
              } else {
                return value;
              }
            });

            // Retry the failed request
            request.headers.set('Authorization', `Bearer ${accessToken}`);
            return ky(request);
          } catch (error: any) {
            console.log(error);
            // user.reset();
            goto('/auth');
          }
        }
      },
    ],
  },
});
export default kyAuth;