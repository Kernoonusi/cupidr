<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import type { LayoutData } from "./$types";
  import kyApi from "$lib/api/kyApi";
  import type { UserResponse } from "$lib/types";
  import { PUBLIC_APIURL } from "$env/static/public";
  import { invalidate } from "$app/navigation";
  import AvatarWithName from "$lib/components/AvatarWithName.svelte";
  import { ProgressRadial } from "@skeletonlabs/skeleton";
  import kyApiSimple from "$lib/api/kyApiSimple";

  let userData: UserResponse;
  let avatarSrc: string;
  export let data: LayoutData;

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
    class="m-auto card w-full sm:w-5/6 mt-5 p-4 variant-soft flex flex-col items-center"
  >
    <AvatarWithName
      src={avatarSrc}
      name={userData.name}
      email={userData.email}
    />
    <slot />
  </main>
{/if}
