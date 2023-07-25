// import { browser } from '$app/environment';
// import type { User } from '$lib/types';
// import { writable } from 'svelte/store';

// function initializeData(): User{
//   if(browser && localStorage.getItem('user')){
//     return JSON.parse(localStorage.getItem('user')!);
//   }
//   else return {
//     email: "",
//     name: "",
//     profileImageUrl: "",
//     gender: "",
//     geolocation: "",
//     accessToken: "",
//   }
// }

// export const user = writable(initializeData());
// user.subscribe(
//   (value) => browser && (localStorage.user = JSON.stringify(value))
// );
