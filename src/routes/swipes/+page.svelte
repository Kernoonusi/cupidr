<script lang="ts">
  import type { PageData } from "./$types";
  import { PUBLIC_APIURL } from "$env/static/public";
  import type { PhotosResponse, UserResponse } from "$lib/types";
  import {
    ProgressRadial,
    toastStore,
    type ToastSettings,
  } from "@skeletonlabs/skeleton";
  import { createQuery } from "@tanstack/svelte-query";
  import { fade, fly, scale } from "svelte/transition";
  import { onMount } from "svelte";
  import { invalidateAll } from "$app/navigation";
  import kyApiSimple from "$lib/api/kyApiSimple";
  import ky from "ky";
  import getUserData from "$lib/api/getUserData";

  let isOpen = false;
  let userData: UserResponse;
  let infoElem: HTMLElement;
  let infoBioElem: HTMLElement;
  let isEducation1: boolean = false;
  let swipeDest: number;
  let match: UserResponse;
  export let data: PageData;
  export let form;

  async function getMatchesData() {
    try {
      if (data.matches[0] && data.matches[0].id != 0) {
        let user: UserResponse = await kyApiSimple
          .get(`users/${data.matches[0].id}`, {
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
        console.log(user);
        return user;
      } else if(isEducation1) {
        let user: UserResponse = {
          id: 0,
          email: "example@mail.su",
          name: "Имя",
          birthday: "2000-07-14T00:00:00.000Z",
          gender: "male",
          lfGender: "male",
          bio: "Здесь человек расскажет вам о себе",
          geolocation: "Город",
          isActivated: true,
          UserPhoto: [
            {
              id: 0,
              userId: 0,
              photoUrl: "",
              isProfile: true,
            },
          ],
        };
        return user;
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

  const matches = createQuery({
    queryKey: ["matches"],
    queryFn: getMatchesData,
    initialData: data.matches[0],
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

  function getSrc(photo: PhotosResponse) {
    if (!isEducation1) {
      return PUBLIC_APIURL + photo.photoUrl;
    } else {
      return photo.photoUrl;
    }
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

  function showInfo() {
    if (!isOpen) {
      let height = infoElem.offsetHeight;
      infoElem.animate(
        [
          {
            height: `${height}px`,
          },
          {
            height: `${height * 4}px`,
          },
        ],
        {
          duration: 1000,
          fill: "forwards",
        },
      );
      infoBioElem.animate(
        [
          {
            display: "none",
            opacity: "0",
          },
          {
            display: "block",
          },
          {
            display: "block",
            opacity: "1",
          },
        ],
        {
          duration: 1000,
          fill: "forwards",
        },
      );
      isOpen = true;
    } else {
      // let height = infoElem.offsetHeight;
      infoElem.getAnimations().forEach((animation) => {
        animation.reverse();
      });
      infoBioElem.getAnimations().forEach((animation) => {
        animation.reverse();
      });
      isOpen = false;
    }
  }

  $: {
    if ($user.data && !$user.error) {
      userData = $user.data as UserResponse;
    } else{
      userData = data.user;
    }
    if ($matches.data && !$matches.error) {
      match = $matches.data;
    } else{
      match = data.matches[0];
    }
  }

  $: {
    if ($user.isError) {
      const t: ToastSettings = {
        message: ($user.error as { message: string }).message,
        background: "variant-filled-error",
        timeout: 10000,
      };
      toastStore.trigger(t);
    }
    if ($matches.isError) {
      const t: ToastSettings = {
        message: ($matches.error as { message: string }).message,
        background: "variant-filled-error",
        timeout: 10000,
      };
      toastStore.trigger(t);
    }
  }

  $: {
    if (form && data.matches.at(-1) != form[0]) {
      data.matches.push(form[0]);
    }
  }

  onMount(() => {
    isEducation1 = data.isEducation;
  });
</script>

{#if $user.isLoading || $matches.isLoading}
  <div class="flex justify-center mt-64">
    <ProgressRadial />
  </div>
{:else if userData && match}
  {#key data.matches[0]}
    <div
      class="relative card rounded-3xl lg:w-2/3 xl:w-3/6 2xl:w-5/12 mt-6 w-5/6 m-auto"
      in:scale
      out:fly={{ duration: 200, x: swipeDest }}
    >
      <div
        bind:this={elemCarousel}
        class="snap-x snap-mandatory rounded-3xl scroll-smooth hide-scrollbar max-h-[70vh] flex overflow-x-auto"
      >
        {#if match.UserPhoto[0]}
          {#each match.UserPhoto as photo}
            <img
              class="snap-center object-cover aspect-[9/16] sm:aspect-[3/4] p-px w-[600px]"
              src={getSrc(photo)}
              alt="profile photo №{photo.id}"
            />
          {/each}
        {:else}
          <div
            class="snap-center flex text-center items-center justify-center w-full max-h-[70vh] aspect-[9/16] sm:aspect-[3/4] p-px"
          >
            <h1 class="h1">У пользователя нет фото</h1>
          </div>
        {/if}
      </div>

      {#if data.isEducation}
        <div
          transition:fade
          class="flex sm:hidden rounded-l-3xl flex-col items-center justify-center gap-1 bg-opacity-40 absolute bg-black backdrop-blur-sm w-full h-full top-0"
          on:pointerenter={() => (data.isEducation = false)}
        >
          <i class="fa-solid fa-arrow-right fa-2xl" />
          <i class="fa-solid fa-hand-point-up fa-2xl" />
          <h2 class="h2 mt-6">Scroll to view other photo</h2>
        </div>
      {/if}

      <div class="hidden sm:flex absolute rounded-l-3xl top-0 h-full w-full">
        {#if data.isEducation}
          <div
            class="flex bg-opacity-40 rounded-l-3xl bg-black backdrop-blur-sm w-full h-full top-0"
          >
            <button
              class="w-1/2 h-full rounded-l-3xl"
              on:click={() => {
                data.isEducation = false;
                carouselLeft();
              }}
            >
              <h2 class="h2 mt-6">Click to view other photo</h2>
              <i class="fa-solid fa-arrow-left fa-2xl"></i>
            </button>
            <button
              class="w-1/2 h-full rounded-r-3xl"
              on:click={() => {
                data.isEducation = false;
                carouselRight();
              }}
            >
              <h2 class="h2 mt-6">Click to view other photo</h2>
              <i class="fa-solid fa-arrow-right fa-2xl"></i>
            </button>
          </div>
        {:else}
          <button
            class="w-1/2 h-full rounded-l-3xl"
            on:click={() => carouselLeft()}
          />
          <button
            class="w-1/2 h-full rounded-r-3xl"
            on:click={() => carouselRight()}
          />
        {/if}
      </div>

      <section
        class="absolute bg-opacity-40 backdrop-blur-sm text-white bg-black bottom-0 rounded-b-3xl w-full p-4 flex justify-between"
        bind:this={infoElem}
      >
        <div class="flex flex-col">
          <h2 class="h2">{match.name}, {getAge(match.birthday)}</h2>
          <p>{match.geolocation}</p>
          <p class="hidden opacity-0 mt-6" bind:this={infoBioElem}>
            {match.bio
              ? match.bio
              : "Пользователь решил ничего о себе не писать"}
          </p>
        </div>
        <button class="h-min self-center" on:click={() => showInfo()}
          ><i class="fa-solid fa-circle-info fa-lg" /></button
        >
      </section>
    </div>
  {/key}
  <br /><br /><br /><br />
  <nav class="absolute bottom-6 flex justify-center gap-32 w-full">
    <form action="?/dislike" method="post">
      <input type="text" value={match.id} name="id" class="hidden" />
      <button
        type="submit"
        class="btn-icon btn-icon-xl variant-filled"
        on:click={() => {
          swipeDest = -400;
          data.matches.shift();
        }}><i class="fa-solid fa-xmark fa-2xl" /></button
      >
    </form>
    <form action="?/like" method="post">
      <input type="text" value={match.id} name="id" class="hidden" />
      <button
        type="submit"
        class="btn-icon btn-icon-xl variant-filled"
        on:click={() => {
          swipeDest = 400;
          data.matches.shift();
        }}><i class="fa-solid fa-heart fa-2xl" /></button
      >
    </form>
  </nav>
{/if}

<style lang="scss">
</style>
