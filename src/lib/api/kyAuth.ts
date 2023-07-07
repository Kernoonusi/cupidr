import ky from 'ky';
import { get } from 'svelte/store';
import { user } from '$lib/stores/user'; // assuming you have a user store and a setUser action
import { goto } from '$app/navigation'; // svelte kit navigation
import { APIURL }  from '$env/static/private';
import type { TokensResponse } from '$lib/types';

const api = ky.create({
  prefixUrl: APIURL,
  hooks: {
    beforeRequest: [
      request => {
        const token = get(user)?.accessToken;
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          // Refresh token
          try {
            const refreshedUser: TokensResponse = await api.post('auth/refresh').json();
            user.update((value) => {
              if (value) {
                return { ...value, accessToken: refreshedUser.accessToken };
              } else {
                return value;
              }
            });

            // Retry the failed request
            request.headers.set('Authorization', `Bearer ${refreshedUser.accessToken}`);
            
            return ky(request);
          } catch (error) {
            // If refresh also fails, force logout
            user.set(null);
            goto('/login');
          }
        }
      },
    ],
  },
});