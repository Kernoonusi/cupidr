import ky from "ky-universal";
import { env } from "$env/dynamic/public";
import { redirect, type Cookies, error } from "@sveltejs/kit";
import type { TokensResponse } from "$lib/types";
import kyApiSimple from "./kyApiSimple";

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
          console.log(response.status + "before before tokens");
          if (response.status === 401) {
            try {
              if (cookie) {
                console.log("before tokens");

                let tokens: TokensResponse = await kyApiSimple
                  .get("auth/refresh", {
                    headers: {
                      token: cookie.get("refreshToken"),
                    },
                  })
                  .json();
                console.log("after tokens");
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
                  `Bearer ${tokens.accessToken}`,
                );
                request.headers.set("token", tokens.refreshToken);

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
