<script lang="ts">
  import getUserData from "$lib/api/getUserData";
  import type { UserResponse } from "$lib/types";
  import { createQuery } from "@tanstack/svelte-query";
  import type { PageData } from "./$types";
  import { PUBLIC_APIURL } from "$env/static/public";
  import {
    FileDropzone,
    ProgressRadial,
    type ToastSettings,
  } from "@skeletonlabs/skeleton";
  import { enhance } from "$app/forms";
  import { scale } from "svelte/transition";
  import { toastStore } from "@skeletonlabs/skeleton";

  let userData: UserResponse;
  let photos: HTMLDivElement[] = [];
  let formElem: HTMLFormElement;
  export let data: PageData;
  export let form;

  function deletePhoto(index: number) {
    userData.UserPhoto.splice(index, 1);
  }

  function makePhotoProfile(index: number) {
    userData.UserPhoto.forEach((element, index) => {
      if (element.isProfile) {
        userData.UserPhoto[index].isProfile = false;
      }
    });
    userData.UserPhoto[index].isProfile = true;
  }

  const user = createQuery({
    queryKey: ["user"],
    queryFn: () => getUserData(data.accessToken, data.refreshToken),
    initialData: data.user,
  });

  $: {
    if ($user.data) {
      userData = $user.data;
    } else if (data.user) {
      userData = data.user;
    }
  }

  $: {
    if (form?.error) {
      const t: ToastSettings = {
        message: form.error,
        background: "variant-filled-error",
        timeout: 10000,
      };
      toastStore.trigger(t);
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
  <h2 class="h2 mt-6 text-center">Ваши фото</h2>
  <section class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
    {#each userData.UserPhoto as photo, i}
      {#if userData.UserPhoto[i]}
        <div
          out:scale
          bind:this={photos[i]}
          class="relative h-auto max-w-full bg-surface-600 rounded-2xl flex justify-center"
        >
          <form action="?/deletePhoto" method="post" use:enhance on:submit|preventDefault={() => deletePhoto(i)}>
            <input type="text" name="photoId" class="hidden" value={photo.id} />
            <button
              type="submit"
              class="btn-icon btn-icon-sm variant-filled absolute top-1 left-1"
              ><i class="fa-solid fa-xmark fa-lg" /></button
            >
          </form>
          <form
            action="?/makePhotoProfile"
            method="post"
            use:enhance
            on:submit|preventDefault={() => makePhotoProfile(i)}
          >
            <input
              type="text"
              name="photoId1"
              class="hidden"
              value={photo.id}
            />
            <button
              type="submit"
              class="btn-icon btn-icon-sm {userData.UserPhoto[i].isProfile
                ? 'variant-filled-primary'
                : 'variant-filled'} absolute top-1 right-1"
              ><i class="fa-solid fa-star fa-lg" /></button
            >
          </form>
          <img
            class="w-[300px] aspect-square object-cover rounded-2xl bg-surface-600"
            src={PUBLIC_APIURL + photo.photoUrl}
            alt="profile {photo.id}"
          />
        </div>
      {/if}
    {/each}
    {#if userData.UserPhoto.length != 5}
      <form
        action="?/uploadPhoto"
        bind:this={formElem}
        method="POST"
        class="w-full h-full"
        enctype="multipart/form-data"
      >
        <FileDropzone
          name="file"
          multiple
          rounded="rounded-2xl"
          on:change={() => formElem.submit()}
        >
          <svelte:fragment slot="lead"><i class="fa-solid fa-file-image fa-2xl" /></svelte:fragment>
          <svelte:fragment slot="message">Загрузите ваше фото</svelte:fragment>
          <svelte:fragment slot="meta">PNG, JPG, JPEG</svelte:fragment>
        </FileDropzone>
      </form>
    {:else}
      <div class="card p-4" />
    {/if}
    <section />
  </section>
{/if}

<style lang="scss">
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 768px) {
    .md\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
</style>
