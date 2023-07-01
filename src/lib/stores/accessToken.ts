import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultValue = '';
const stored = browser ? window.localStorage.getItem('accessToken') ?? defaultValue : defaultValue;

export const accessToken = writable<string>(stored);

accessToken.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('theme', value);
  }
});

export default accessToken;