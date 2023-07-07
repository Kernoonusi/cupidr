import { writable } from 'svelte/store';
import type { User } from '$lib/types';

// create a writable store with a default value of null
const userStore = writable<User | null>(null);

// export a custom store with some helper methods
export const user = {
  // subscribe to the store
  subscribe: userStore.subscribe,
  // set the user value
  set: (value: User | null) => {
    userStore.set(value);
  },
  // update the user value
  update: (fn: (value: User | null) => User | null) => {
    userStore.update(fn);
  },
  // reset the user value to null
  reset: () => {
    userStore.set(null);
  },
};