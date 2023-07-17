import ky from 'ky-universal';
import { env }  from '$env/dynamic/public';

const kyApi = ky.create({
    // устанавливаем базовый URL из переменной окружения
    prefixUrl: env.PUBLIC_APIURL,
});
export default kyApi;