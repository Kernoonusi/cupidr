import type { PageLoadServer } from './$types.js';
import ky from 'ky-universal';

export const load: PageLoadServer = async ({ params }) => {
    return await ky(`https://64929530428c3d2035d049c5.mockapi.io/users/${params.id}`).json();
}