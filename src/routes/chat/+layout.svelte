<script lang="ts">
  import { AppShell, Avatar } from "@skeletonlabs/skeleton";
  import type { LayoutData } from "./$types";
  import TextInput from "$lib/components/TextInput.svelte";
  import { PUBLIC_APIURL } from "$env/static/public";
  import getUserData from "$lib/api/getUserData";
  import type { UserResponse } from "$lib/types";
  import { createQuery } from "@tanstack/svelte-query";

  let showSearch: boolean = false;

  let userData: UserResponse;
  let avatarSrc: string;
  export let data: LayoutData;

  function avatarSrcSearch() {
    let photoUrl;
    userData.UserPhoto.map((element) => {
      if (element.isProfile) {
        photoUrl = element.photoUrl;
      }
    });
    avatarSrc = PUBLIC_APIURL + photoUrl;
  }

  const user = createQuery({
    queryKey: ["user"],
    queryFn: () => getUserData(data.accessToken, data.refreshToken),
    initialData: data.user,
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

<AppShell>
  <svelte:fragment slot="sidebarLeft">
    <div id="sidebar-left" class="mt-6">
      <nav
        class="w-screen grid grid-cols-[min-content_min-content_1fr] items-center bg-surface-500/30 gap-4 p-4"
      >
        <Avatar src={avatarSrc} width="w-11" />
        {#if showSearch}
          <button
            class="flex justify-end"
            on:click={() => (showSearch = !showSearch)}
            ><i class="fa-solid fa-magnifying-glass fa-xl" /></button
          >
          <form>
            <TextInput placeholder="поиск" name="searchElem" />
          </form>
        {:else}
          <h2 class="h2">Чаты</h2>
          <button
            class="flex justify-end"
            on:click={() => (showSearch = !showSearch)}
            ><i class="fa-solid fa-magnifying-glass fa-xl" /></button
          >
        {/if}
        <form class="hidden lg:block bg-surface-500/30 p-4">
          <TextInput placeholder="поиск" name="searchElem" />
        </form>
      </nav>

      <nav class="w-screen bg-surface-500/30 p-4">Тут контакты</nav>
    </div>
  </svelte:fragment>
  <slot />
</AppShell>
