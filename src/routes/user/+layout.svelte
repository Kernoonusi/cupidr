<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import type { LayoutData } from "./$types";
  import getUserData from "$lib/api/getUserData";
  import type { UserResponse } from "$lib/types";
  import { PUBLIC_APIURL } from "$env/static/public";
  import { afterNavigate, goto, invalidate } from "$app/navigation";
  import AvatarWithName from "$lib/components/AvatarWithName.svelte";
  import { ProgressRadial } from "@skeletonlabs/skeleton";
  import { fly } from "svelte/transition";

  let userData: UserResponse;
  let avatarSrc: string;
  let navDestination = 400;

  export let data: LayoutData;
  const user = createQuery({
    queryKey: ["user"],
    queryFn: () => getUserData(data.accessToken, data.refreshToken),
    initialData: data.user,
  });

  function avatarSrcSearch() {
    let photoUrl;
    userData.UserPhoto.map((element) => {
      if (element.isProfile) {
        photoUrl = element.photoUrl;
      }
    });
    avatarSrc = PUBLIC_APIURL + photoUrl;
  }

  afterNavigate(() => {
    navDestination = 400;
  });

  $: {
    if ($user.data && !$user.error) {
      userData = $user.data;
    } else if (data.user) {
      userData = data.user;
    }
  }
  $: {
    if (userData) {
      avatarSrcSearch();
    }
  }
</script>

{#if $user.isLoading}
  <div class="flex justify-center mt-64">
    <ProgressRadial />
  </div>
{:else if $user.isError}
  <p>Error: {$user.error.message}</p>
{:else if $user.isSuccess && userData}
  <main
    class="m-auto card relative w-full sm:w-5/6 p-4 mt-5 variant-soft flex flex-col items-center"
  >
    <button
      class="absolute top-5 left-7 {!data.url?.split('/')[2] ? 'hidden' : ''}"
      on:click={() => {
        goto("/user");
        navDestination = -400;
      }}><i class="fa-solid fa-arrow-left fa-2xl"></i></button
    >
    <AvatarWithName
      src={avatarSrc}
      name={userData.name}
      email={userData.email}
    />
    {#key data.url}
      <main
        class="w-full flex flex-col items-center"
        in:fly={{ delay: 300, x: navDestination }}
        out:fly={{ duration: 300, x: navDestination * -1 }}
      >
        <slot />
      </main>
    {/key}
  </main>
{/if}
