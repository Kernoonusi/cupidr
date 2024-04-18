<script lang="ts">
  import { AppShell, Avatar, ProgressRadial } from "@skeletonlabs/skeleton";
  import type { LayoutData } from "./$types";
  import TextInput from "$lib/components/TextInput.svelte";
  import { PUBLIC_APIURL } from "$env/static/public";
  import getUserData from "$lib/api/getUserData";
  import type { ChatsResponse, IChat, PhotosResponse, UserResponse } from "$lib/types";
  import { createQuery } from "@tanstack/svelte-query";
    import { invalidateAll } from "$app/navigation";
    import kyApiSimple from "$lib/api/kyApiSimple";
    import ky from "ky";

  let showSearch: boolean = false;

  let userData: UserResponse;
  let chatsData: IChat[];
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

  function chatAvatarSrc(photos: PhotosResponse[]){
    if(photos){
      return photos[0].photoUrl;
    }else{
      return "";
    }
  }

  async function getChats() {
    try {
      if (data.chats) {
        let chats: IChat[] = await kyApiSimple
          .get("chat/myChats", {
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
              token: data.refreshToken,
            },
            hooks: {
              afterResponse: [
                async (request, _options, response) => {
                  if (response.status === 401) {
                    invalidateAll();
                    return ky(request);
                  }
                },
              ],
            },
          })
          .json();
        console.log(chats);
        return chats;
      } 
    } catch (err: unknown) {
      console.log(err);
    }
  }

  const user = createQuery({
    queryKey: ["user"],
    queryFn: () => getUserData(data.accessToken, data.refreshToken),
    initialData: data.user,
  });

  const chats = createQuery({
    queryKey: ["chats"],
    queryFn: () => getChats(),
    initialData: data.chats,
  });

  $: {
    if ($user.data && !$user.error) {
      userData = $user.data as UserResponse;
    } else if (data.user) {
      userData = data.user;
    }
    if ($chats.data && !$chats.error) {
      chatsData = $chats.data as IChat[];
    } else if (data.user) {
      chatsData = data.chats;
    }
  }
  $: {
    if (userData) {
      avatarSrcSearch();
    } 
  }
</script>

{#if $user.isLoading || $chats.isLoading}
  <div class="flex justify-center mt-64">
    <ProgressRadial />
  </div>
{:else if $user.isSuccess && $chats.isSuccess && userData && chatsData}
  <main class="w-full">
  <AppShell>
    <svelte:fragment slot="header">
      <div id="header" class="flex lg:hidden">
        <nav
          class="w-full grid grid-cols-[min-content_min-content_1fr_min-content] items-center gap-4"
        >
          <Avatar src={avatarSrc} width="w-11" />
          {#if showSearch}
            <button on:click={() => (showSearch = !showSearch)}
              ><i class="fa-solid fa-magnifying-glass fa-xl" /></button
            >
            <form>
              <TextInput placeholder="поиск" name="searchElem" />
            </form>
            <br />
          {:else}
            <h2 class="h2">Чаты</h2>
            <br />
            <button on:click={() => (showSearch = !showSearch)}
              ><i class="fa-solid fa-magnifying-glass fa-xl" />
            </button>
          {/if}
        </nav>
      </div>
    </svelte:fragment>
    <svelte:fragment slot="sidebarLeft">
      <div id="sidebar-left" class="hidden lg:flex flex-col gap-8">
        <nav
          class="w-72 grid grid-cols-[min-content_min-content_1fr_min-content] items-center gap-4"
        >
          <Avatar src={avatarSrc} width="w-11" />
          {#if showSearch}
            <button on:click={() => (showSearch = !showSearch)}
              ><i class="fa-solid fa-magnifying-glass fa-xl" /></button
            >
            <form class="w-full">
              <TextInput placeholder="поиск" name="searchElem" />
            </form>
          {:else}
            <h2 class="h2">Чаты</h2>
            <br />
            <button on:click={() => (showSearch = !showSearch)}
              ><i class="fa-solid fa-magnifying-glass fa-xl" />
            </button>
          {/if}
        </nav>
        <section class="flex flex-col gap-5">
          {chatsData[0].id}
        </section>
      </div>
    </svelte:fragment>
    <slot />
  </AppShell>
</main>
{/if}
