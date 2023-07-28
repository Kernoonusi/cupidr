import { invalidateAll } from "$app/navigation";
import kyApiSimple from "$lib/api/kyApiSimple";
import ky from "ky";

async function authorization(accessToken: string | undefined, refreshToken: string | undefined) {
  try {
    return await kyApiSimple
      .get("users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          token: refreshToken,
        },
        hooks: {
          afterResponse: [
            async (request, _options, response) => {
              if (response.status === 401) {
                invalidateAll();
                return ky(request);
              }
            },
          ],
        },
      })
      .json();
  } catch (err: unknown) {
    console.log(err);
  }
}
export default authorization;