<script lang="ts">
  import { invalidate } from "$app/navigation";
  import kyApi from "$lib/api/kyApi";
  import type { UserResponse } from "$lib/types";
  import { createQuery } from "@tanstack/svelte-query";
  import type { PageData } from "./$types";
  import {
    ProgressRadial,
    Avatar,
    toastStore,
    type ToastSettings,
  } from "@skeletonlabs/skeleton";
  import TextInput from "$lib/components/TextInput.svelte";
  import DateInput from "$lib/components/DateInput.svelte";
  import kyApiSimple from "$lib/api/kyApiSimple";

  let userData: UserResponse;
  export let data: PageData;
  export let form;

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

  const user = createQuery({
    queryKey: ["user"],
    queryFn: () => authorization(),
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
  <form action="?/updateUser" method="POST" class="flex flex-col gap-4 mt-6">
    <h2 class="h2 text-center">Личные данные</h2>
    <TextInput
      label={"Имя"}
      name={"user-name"}
      value={userData.name}
      autocomplete={"name"}
    />
    <label class="label flex flex-col w-full gap-2">
      <span>Почта</span>
      <input type="email" class="input p-2" value={userData.email} disabled />
    </label>
    <DateInput
      label={"Дата рождения"}
      name={"user-birthday"}
      value={userData.birthday.slice(0, 10)}
      autocomplete={"birthday"}
    />
    <label class="label flex flex-col w-full gap-2">
      <span>Ваш пол</span>
      <select class="select p-2" name="user-sex" bind:value={userData.gender}>
        <option value="female">Девушка</option>
        <option value="male">Мужик</option>
      </select>
      <span class="text-red-600 hidden warn" />
    </label>
    <label class="label flex flex-col w-full gap-2">
      <span>Я ищу</span>
      <select
        class="select p-2"
        name="user-prefer"
        bind:value={userData.lfGender}
      >
        <option value="female">Девушек</option>
        <option value="male">Мужиков</option>
        <option value="both">Всех</option>
      </select>
      <span class="text-red-600 hidden warn" />
    </label>
    <TextInput
      label={"Ваше местоположение"}
      name={"user-geo"}
      value={userData.geolocation}
      autocomplete={"address-level1"}
    />
    <label class="label flex flex-col w-full gap-2">
      <span>О себе</span>
      <textarea
        class="textarea p-2"
        rows="4"
        placeholder="О себе"
        name="user-bio"
        bind:value={userData.bio}
      />
    </label>
    <button type="submit" class="btn variant-filled-tertiary mt-6">Ок</button>
  </form>
{/if}
