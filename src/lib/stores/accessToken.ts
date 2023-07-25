import { writable } from "svelte/store";
import { browser } from "$app/environment";

const defaultValue = "0";
const initialValue = browser
  ? window.localStorage.getItem("accessToken") ?? defaultValue
  : defaultValue;

const accessToken = writable<string>(initialValue);

accessToken.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem("accessToken", value);
  }
});

export default accessToken;
