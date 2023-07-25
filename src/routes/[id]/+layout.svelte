<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import type { LayoutData } from "./$types";
  import kyApi from "$lib/api/kyApi";
  import type { UserResponse } from "$lib/types";
  import { PUBLIC_APIURL } from "$env/static/public";
  import { goto, invalidate } from "$app/navigation";
  import AvatarWithName from "$lib/components/AvatarWithName.svelte";
  import { ProgressRadial } from "@skeletonlabs/skeleton";
  import kyApiSimple from "$lib/api/kyApiSimple";
    import { fly, scale } from "svelte/transition";

  let userData: UserResponse;
  let avatarSrc: string;
  let swipeDest: number;
  export let data: LayoutData;

  function like() {
    swipeDest = 400;
    goto(`/1`);
  }
  function dislike() {
    swipeDest = -400;
    goto(`/0`);
  }

  // async function authorization() {
  //   try {
  //     return await kyApiSimple
  //       .get("users/me", {
  //         headers: {
  //           Authorization: `Bearer ${data.accessToken}`,
  //           token: data.refreshToken,
  //         },
  //         hooks: {
  //           afterResponse: [
  //             async (_request, _options, response) => {
  //               if (response.status === 401) {
  //                 invalidate("/user");
  //               }
  //             },
  //           ],
  //         },
  //       })
  //       .json();
  //   } catch (err: unknown) {
  //     console.log(err);
  //     invalidate("/user");
  //   }
  // }

  // function avatarSrcSearch() {
  //   let photoUrl;
  //   userData.UserPhoto.map((element) => {
  //     if (element.isProfile) {
  //       photoUrl = element.photoUrl;
  //     }
  //   });
  //   avatarSrc = PUBLIC_APIURL + photoUrl;
  // }

  // const user = createQuery({
  //   queryKey: ["user"],
  //   queryFn: () => authorization(),
  //   initialData: data.user,
  // });

  // $: {
  //   if ($user.data && !$user.error) {
  //     userData = $user.data;
  //   } else if (data.user) {
  //     userData = data.user;
  //   }
  // }
  // $: {
  //   if (userData) {
  //     avatarSrcSearch();
  //   }
  // }
</script>

<main
  class="m-auto card relative w-full sm:w-5/6 mt-5 variant-soft flex h-[85vh] flex-col items-center"
>
  {#key data.id}
    <div
      class="relative card rounded-3xl lg:w-2/3 xl:w-3/6 2xl:w-5/12 mt-6 w-5/6 m-auto"
      in:scale={{delay: 200}}
      out:fly={{duration: 200, x: swipeDest}}
    >
      <slot />
    </div>
  {/key}
  <nav class="absolute bottom-6 flex mt-8 justify-center gap-32 w-full">
    <button 
    class="btn-icon btn-icon-xl variant-filled"
    on:click={() => dislike()}
      ><i class="fa-solid fa-xmark fa-2xl" /></button
    >
    <button 
    class="btn-icon btn-icon-xl variant-filled"
    on:click={() => like()}
      ><i class="fa-solid fa-heart fa-2xl" /></button
    >
  </nav>
</main>
