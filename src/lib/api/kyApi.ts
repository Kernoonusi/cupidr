import ky from 'ky-universal';
import { APIURL }  from '$env/static/private';

const api = ky.create({
    // устанавливаем базовый URL из переменной окружения
    prefixUrl: APIURL,
    // добавляем другие опции по желанию, например, таймаут или заголовки
    headers: {
      'content-type': 'application/json'
    }
});
export default api;