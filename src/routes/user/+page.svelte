<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import type { PageData } from "./$types";
  import getUserData from "$lib/api/getUserData";
  import type { UserResponse } from "$lib/types";
  import { ProgressRadial } from "@skeletonlabs/skeleton";
  import { invalidate } from "$app/navigation";
  import kyApiSimple from "$lib/api/kyApiSimple";

  let userData: UserResponse;
  export let data: PageData;

  async function authorization() {
    try {
      let user: UserResponse = await kyApiSimple
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
      return user;
    } catch (err: unknown) {
      console.log(err);
    }
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
</script>

{#if $user.isLoading}
  <div class="flex justify-center mt-64">
    <ProgressRadial />
  </div>
{:else if $user.isError}
  <p>Error: {$user.error.message}</p>
{:else if $user.isSuccess && userData}
  <nav class="list-nav w-full mt-6">
    <h2 class="h2 text-center">Настройки</h2>
    <br />
    <ul
      class="card variant-filled-surface p-2 w-full rounded-xl items-start flex flex-col gap-3"
    >
      <li class="w-full">
        <a href="/user/change-info" class="w-full">
          <span class="badge"><i class="fa-solid fa-circle-info fa-lg" /></span>
          <span class="flex-auto w-full">Личные данные</span>
        </a>
      </li>
      <li class="w-full">
        <a href="/user/change-password" class="flex w-full">
          <span class="badge"
            ><i class="fa-solid fa-shield-halved fa-lg" /></span
          >
          <span class="flex-auto w-full">Защита</span>
        </a>
      </li>
      <li class="w-full">
        <a href="/user/change-photos" class="w-full">
          <span class="badge"><i class="fa-solid fa-image fa-lg" /></span>
          <span class="flex-auto w-full">Фотографии</span>
        </a>
      </li>
      <li class="w-full">
        <a href="/user/change-theme" class="w-full">
          <span class="badge"><i class="fa-solid fa-palette fa-lg"></i></span>
          <span class="flex-auto w-full">Внешний вид</span>
        </a>
      </li>
    </ul>
  </nav>
  <form action="?/logout" method="post">
    <button type="submit" class="btn variant-filled-primary mt-12">Выйти</button>
  </form>
{/if}
