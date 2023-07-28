<script lang="ts">
  import type { PageData } from "./$types";
  import { PUBLIC_APIURL } from "$env/static/public";
  import getUserData from "$lib/api/getUserData";
  import type { UserResponse } from "$lib/types";
  import { ProgressRadial } from "@skeletonlabs/skeleton";
  import { createQuery} from "@tanstack/svelte-query";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  let isOpen = false;
  let userData: UserResponse;
  let infoElem: HTMLElement;
  let infoBioElem: HTMLElement;
  let isEducation1: boolean = false;
  export let data: PageData;

  const user = createQuery({
    queryKey: ["user"],
    queryFn: () => getUserData(data.accessToken, data.refreshToken),
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

  function showInfo() {
    if(!isOpen){
      let height = infoElem.offsetHeight;
      infoElem.animate([
        {
          height: `${height}px`,
        },
        {
          height: `${height * 4}px`,
        }
      ],
      {
        duration: 1000,
        fill: 'forwards'
      }
      )
      infoBioElem.animate([
        {
          display: 'none',
          opacity: '0',
        },
        {
          display: 'block',
        },
        {
          display: 'block',
          opacity: '1',
        }
      ],
      {
        duration: 1000,
        fill: 'forwards'
      }
      )
      isOpen = true;
    }
    else{
      // let height = infoElem.offsetHeight;
      infoElem.getAnimations().forEach(animation => {
        animation.reverse();
      });
      infoBioElem.getAnimations().forEach(animation => {
        animation.reverse();
      });
      isOpen = false;
    }
  }

  $: {
    if ($user.data && !$user.error && !isEducation1) {   
      userData = $user.data;
    } else if (data.user) {
      userData = data.user;
    }
  }

  onMount(() => {
    isEducation1 = data.isEducation;
  });
</script>

{#if $user.isLoading}
  <div class="flex justify-center mt-64">
    <ProgressRadial />
  </div>
{:else if $user.isError}
  <p>Error: {$user.error.message}</p>
{:else if $user.isSuccess && userData}
  <div
    bind:this={elemCarousel}
    class="snap-x snap-mandatory rounded-3xl scroll-smooth hide-scrollbar max-h-[70vh] flex overflow-x-auto"
  >
    {#each userData.UserPhoto as photo}
      {#if isEducation1}
        <img
          transition:fade
          class="snap-center object-cover aspect-[9/16] sm:aspect-[3/4] p-px"
          src="tmp_pkbna_d.png"
          alt="profile photo №{photo.id}"
        />
        <img
          transition:fade
          class="snap-center object-cover aspect-[9/16] sm:aspect-[3/4] p-px"
          src="photo2.png"
          alt="profile photo №{photo.id}"
        />
      {:else}
        <img
          class="snap-center object-cover aspect-[9/16] sm:aspect-[3/4] p-px"
          src={PUBLIC_APIURL + photo.photoUrl}
          alt="profile photo №{photo.id}"
        />
      {/if}
    {/each}
  </div>

  {#if data.isEducation}
    <dialog
      transition:fade
      class="flex flex-col items-center justify-center gap-1 bg-opacity-40 absolute bg-black backdrop-blur-sm w-full h-full top-0"
      on:pointerenter={() => data.isEducation = false}
    >
      <i class="fa-solid fa-arrow-right fa-2xl" />
      <i class="fa-solid fa-hand-point-up fa-2xl" />
      <h2 class="h2 mt-6">Scroll to view other photo</h2>
    </dialog>
  {/if}

  <div class="hidden sm:flex absolute top-0 h-full w-full">
    {#if data.isEducation}
      <div
        class="flex bg-opacity-40 bg-black backdrop-blur-sm w-full h-full top-0"
      />
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
      <h2 class="h2">{userData.name}, {getAge(userData.birthday)}</h2>
      <p>{userData.geolocation}</p>
      <p class="hidden opacity-0 mt-6" bind:this={infoBioElem}>
        {userData.bio ? userData.bio : 'Пользователь решил ничего о себе не писать'}
      </p>
    </div>
    <button class="h-min self-center" on:click={() => showInfo()}
      ><i class="fa-solid fa-circle-info fa-lg" /></button
    >
  </section>
{/if}

<style lang="scss">
</style>
