import ky from 'ky-universal';
import { APIURL }  from '$env/static/private';

const kyApi = ky.create({
    // устанавливаем базовый URL из переменной окружения
    prefixUrl: APIURL,
});
export default kyApi;