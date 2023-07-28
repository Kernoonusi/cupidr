<script lang="ts">
  import getUserData from "$lib/api/getUserData";
  import type { UserResponse } from "$lib/types";
  import { createQuery } from "@tanstack/svelte-query";
  import type { PageData } from "./$types";
  import {
    ProgressRadial,
    toastStore,
    type ToastSettings,
  } from "@skeletonlabs/skeleton";
  import PassInput from "$lib/components/PassInput.svelte";

  let userData: UserResponse;
  export let data: PageData;
  export let form;

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
    } else if (form?.success) {
      const t: ToastSettings = {
        message: "Пароль успешно изменён",
        background: "variant-filled-success",
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
  <form
    action="?/updatePassword"
    method="POST"
    class="flex flex-col gap-4 mt-6"
  >
    <h2 class="h2 text-center">Изменить пароль</h2>
    <PassInput label={"Новый пароль"} name={"user-password"} />
    <PassInput label={"Подтвердите новый пароль"} name={"user-conf-password"} />

    <button type="submit" class="btn variant-filled-tertiary mt-6">Ок</button>
  </form>
{/if}
