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
  import { goto } from "$app/navigation";
  import { fly } from "svelte/transition";
  import { autoModeWatcher } from "@skeletonlabs/skeleton";

  export let data;
  let navDestination: number;
  let isLoggedIn: boolean = false;

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
          <button
            on:click={() => {
              navDestination =
                data.url?.split("/")[1] == "user"
                  ? 400
                  : data.url?.split("/")[1] == "chat"
                  ? -400
                  : navDestination;
              goto("/");
            }}
            class="btn w-fit sm:flex text-4xl items-center gap-4 hidden"
            ><img src="/logo.svg" alt="" class="w-12" />CUPIDR
          </button>
          <!--  -->
        </svelte:fragment>
        <!-- Mobile -->
        <button
          on:click={() => {
            navDestination =
              data.url?.split("/")[1] == "user"
                ? 400
                : data.url?.split("/")[1] == "chat"
                ? -400
                : navDestination;
            goto("/swipes");
          }}
          class="btn w-fit flex text-4xl items-center gap-4 sm:hidden"
          ><img src="/logo.svg" alt="" class="w-12" />CUPIDR
        </button>
        <!--  -->

        <!-- Desktop -->
        <nav class="gap-4 {isLoggedIn ? 'hidden sm:flex' : 'hidden'}">
          <!-- Swipes -->
          <button
            on:click={() => {
              goto(`/swipes`);
              navDestination = -400;
            }}
            class="btn gap-4"
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
            class="btn gap-4"
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
            class="btn {isLoggedIn ? 'sm:hidden' : 'hidden'}"
            data-sveltekit-preload-data="hover"
            ><i class="fa-solid fa-comments fa-2xl"></i></button
          >
          <!--  -->

          <!-- Desktop -->

          <!-- Logged in -->
          <div
            class="gap-4 items-center cursor-pointer hover:variant-outline-primary rounded-full p-1 {isLoggedIn
              ? 'hidden sm:flex'
              : 'hidden'}"
          >
            <Avatar
              src={data.userAvatar}
              on:click={() => {
                goto(`/user`);
                navDestination = 400;
              }}
            />
          </div>

          <!-- No logged in -->
          <div class="gap-4 {!isLoggedIn ? 'hidden sm:flex' : 'hidden'}">
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
      {#if data.url?.split("/")[1] === ""}
        <main class="w-full h-[91vh] bg-[#E3EBE4] relative overflow-hidden pb-[100px]">
          <slot />
        </main>
      {:else}
        <main
          in:fly={{ delay: 300, x: navDestination }}
          out:fly={{ duration: 300, x: navDestination * -1 }}
          class="m-auto card relative w-full sm:w-5/6 p-4 mt-5 variant-soft flex flex-col items-center"
        >
          <slot />
        </main>
      {/if}
    {/key}
  </AppShell>
  <Toast />
</QueryClientProvider>
