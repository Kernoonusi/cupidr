import ky from "ky-universal";
import { env } from "$env/dynamic/public";
import { redirect, type Cookies } from "@sveltejs/kit";
import type { TokensResponse } from "$lib/types";

let tries = 0;

const api = (cookie: Cookies) => {
  return ky.create({
    prefixUrl: env.PUBLIC_APIURL,
    hooks: {
      beforeRequest: [
        (request) => {
          if (cookie) {
            const refreshToken = cookie.get("refreshToken");
            const accessToken = cookie.get("accessToken");

            if (accessToken) {
              request.headers.set("Authorization", `Bearer ${accessToken}`);
            }
            if (refreshToken) {
              request.headers.set("token", refreshToken);
            }
          }
        },
      ],
      afterResponse: [
        async (request, _options, response) => {        
          if (response.status === 401 && tries < 1) {
            try {
              if (cookie) {
                let tokens: TokensResponse = await api(cookie)
                  .get("auth/refresh")
                  .json();
                cookie.set("accessToken", tokens.accessToken, {
                  httpOnly: true,
                  maxAge: 60 * 15,
                  path: "/",
                });
                cookie.set("refreshToken", tokens.refreshToken, {
                  httpOnly: true,
                  maxAge: 60 * 60 * 24 * 30,
                  path: "/",
                });
                request.headers.set(
                  "Authorization",
                  `Bearer ${tokens.accessToken}`
                );
                request.headers.set("token", tokens.refreshToken);
                tries++;
                console.log(tries);
                
                return ky(request);
              }
            } catch (err) {
              redirect(301, "/auth");
            }
          }
        },
      ],
    },
  });
};
export default api;
