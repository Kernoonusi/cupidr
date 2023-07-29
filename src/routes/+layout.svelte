<script lang="ts">
  import "@skeletonlabs/skeleton/themes/theme-crimson.css";
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  import {
    AppBar,
    AppShell,
    Avatar,
    LightSwitch,
    Toast,
  } from "@skeletonlabs/skeleton";
  import "../app.postcss";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { beforeNavigate, goto } from "$app/navigation";
  import { fly } from "svelte/transition";
  import { autoModeWatcher } from "@skeletonlabs/skeleton";

  export let data;
  let navDestination: number;
  let isLoggedIn: boolean = false;

  // beforeNavigate((e) => {
  //     if(e.to?.url.pathname == '/' && e.from?.url.pathname == '/user'){
  //         navDestination = 400;
  //     }
  //     else if(e.to?.url.pathname == '/' && e.from?.url.pathname == '/chat'){
  //         navDestination = -400;
  //     }
  // });

  onMount(async () => {
    if (data.isLoggedIn) {
      isLoggedIn = data.isLoggedIn;
    }
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  });
</script>

<svelte:head
  >{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head
>

<div class="hidden">
  <LightSwitch></LightSwitch>
</div>

<QueryClientProvider client={queryClient}>
  <AppShell>
    <svelte:fragment slot="header">
      <AppBar
        regionPage="relative"
        slotPageHeader="sticky top-0 z-10"
        gridColumns="grid-cols-3"
        slotDefault="place-self-center"
        slotTrail="place-content-end"
        padding="p-4 sm:px-10 lg:px-28"
      >
        <svelte:fragment slot="lead">
          <!-- Mobile -->
          <button
            on:click={() => {
              goto(`/user`);
              navDestination = -400;
            }}
            class="btn {isLoggedIn ? 'sm:hidden' : 'hidden'}"
            data-sveltekit-preload-data="hover"
            ><i class="fa-solid fa-user fa-2xl"></i>
          </button>
          <!--  -->

          <!-- Desktop -->
          <div class="gap-4 h2 items-center hidden sm:flex">
            <img src="/logo.svg" alt="" class="w-12" />CUPIDR
          </div>
          <!--  -->

        </svelte:fragment>
        <!-- Mobile -->
        <a
          href="/"
          on:click={() => {
            navDestination =
              data.url?.split("/")[1] == "user"
                ? 400
                : data.url?.split("/")[1] == "chat"
                ? -400
                : navDestination;
          }}
          class="h1 flex items-center gap-4 sm:hidden"
          ><img src="/logo.svg" alt="" class="w-12" />CUPIDR</a
        >
        <!--  -->

        <!-- Desktop -->
        <nav class="flex gap-4">
          <!-- Swipes -->
          <button
            on:click={() => {
              goto(`/`);
              navDestination = -400
            }}
            class="btn gap-4 {isLoggedIn ? '' : 'hidden'}"
            data-sveltekit-preload-data="hover"
            ><i class="fa-solid fa-users fa-2xl"></i> Свайпы</button
          >

          <!-- Chats -->
          <button
            on:click={() => {
              goto(`/chat`);
              navDestination = 
                data.url?.split("/")[1] == "user"
                  ? -400
                  : Number(data.url?.split("/")[1])
                  ? 400
                  : navDestination;
            }}
            class="btn gap-4 {isLoggedIn ? '' : 'hidden'}"
            data-sveltekit-preload-data="hover"
            ><i class="fa-solid fa-comments fa-2xl"></i> Чаты</button
          >
        </nav>
        <!--  -->

        <svelte:fragment slot="trail">
          <!-- Mobile -->
          <button
            on:click={() => {
              goto(`/chat`);
              navDestination = 400;
            }}
            class="btn variant-filled sm:hidden {isLoggedIn ? '' : 'hidden'}"
            data-sveltekit-preload-data="hover"
            ><i class="fa-solid fa-comments fa-2xl"></i></button
          >
          <!--  -->

          <!-- Desktop -->

          <!-- Logged in -->
          <div class="flex gap-4 items-center {isLoggedIn ? '' : 'hidden'}">
            <Avatar
              src={data.userAvatar}
              on:click={() => {
                goto(`/user`);
                navDestination = 400;
              }}
            ></Avatar>
          </div>

          <!-- No logged in -->
          <div class="gap-4 {!isLoggedIn ? 'sm:flex' : 'hidden'}">
            <!-- Sing in -->
            <button
              on:click={() => {
                goto(`/auth/login`);
                navDestination = 400;
              }}
              class="btn variant-outline-primary"
              data-sveltekit-preload-data="hover">Войти в аккаунт</button
            >
            <!-- Sign up -->
            <button
              on:click={() => {
                goto(`/auth`);
                navDestination = 400;
              }}
              class="btn variant-filled-primary"
              data-sveltekit-preload-data="hover">Зарегистрироваться</button
            >
          </div>
          <!--  -->
        </svelte:fragment>
      </AppBar>
    </svelte:fragment>
    {#key data.url?.split("/")[1]}
      <main
        in:fly={{ delay: 300, x: navDestination }}
        out:fly={{ duration: 300, x: navDestination * -1 }}
        class="m-auto card relative w-full sm:w-5/6 p-4 mt-5 variant-soft flex flex-col items-center"
      >
        <slot />
      </main>
    {/key}
  </AppShell>
  <Toast />
</QueryClientProvider>
