import ky from "ky-universal";
import { env } from "$env/dynamic/public";

const kyApiSimple = ky.create({ 
    prefixUrl: env.PUBLIC_APIURL,
    hooks: {
        beforeRequest: [
            request => {
                
            }
        ]
    }
});

export default kyApiSimple;
