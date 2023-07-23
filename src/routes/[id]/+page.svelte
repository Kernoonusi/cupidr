<script lang="ts">
  import type { PageData } from "./$types";
  import { goto, invalidate } from "$app/navigation";
  import { PUBLIC_APIURL } from "$env/static/public";
  import kyApiSimple from "$lib/api/kyApiSimple";
  import type { UserResponse } from "$lib/types";
  import { ProgressRadial } from "@skeletonlabs/skeleton";
  import { createQuery } from "@tanstack/svelte-query";
  import type { LayoutData } from "../$types";

  let isOpen = false;
  let userData: UserResponse;
  let avatarSrc: string;
  export let data: PageData;

  function like() {
    goto(`/${Math.ceil(Math.random() * 100)}`);
  }
  function dislike() {
    goto(`/${Math.ceil(Math.random() * 100)}`);
  }

  async function authorization() {
    try {
      return await kyApiSimple
        .get("users/me", {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
            token: data.refreshToken,
          },
          hooks: {
            afterResponse: [
              async (_request, _options, response) => {
                if (response.status === 401) {
                  invalidate("/user");
                }
              },
            ],
          },
        })
        .json();
    } catch (err: unknown) {
      console.log(err);
      invalidate("/user");
    }
  }

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
    queryFn: () => authorization(),
    initialData: data.user,
  });

  function getAge(dateString: string) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  let elemCarousel: HTMLDivElement;

  function carouselLeft(): void {
    const x =
      elemCarousel.scrollLeft === 0
        ? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
        : elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
    elemCarousel.scroll(x, 0);
  }

  function carouselRight(): void {
    const x =
      elemCarousel.scrollLeft ===
      elemCarousel.scrollWidth - elemCarousel.clientWidth
        ? 0 // loop
        : elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
    elemCarousel.scroll(x, 0);
  }

  function showInfo(){
    
  }

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
  <div class="relative card rounded-3xl mt-6 w-5/6 m-auto">
    <div
      bind:this={elemCarousel}
      class="snap-x snap-mandatory scroll-smooth hide-scrollbar h-[70vh] flex overflow-x-auto"
    >
      {#each userData.UserPhoto as photo}
        <img
          class="snap-center object-cover h-full w-full rounded-3xl p-px"
          src={PUBLIC_APIURL + photo.photoUrl}
          alt="profile photo №{photo.id}"
        />
      {/each}
    </div>

    <section class="absolute bg-opacity-40 bg-black bottom-0 rounded-b-3xl w-full p-4 flex justify-between">
      <div class="flex flex-col">
        <h2 class="h2">{userData.name}, {getAge(userData.birthday)}</h2>
        <p>{userData.geolocation}</p>
      </div>
      <button><i class="fa-solid fa-circle-info fa-lg" /></button>
    </section>
  </div>
{/if}

<style lang="scss">
</style>
