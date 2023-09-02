<script lang="ts">
  import { enhance } from "$app/forms";
  import TextInput from "$lib/components/TextInput.svelte";

  let error: string;

  export let form;

  $: {
    if (form?.error) {
      error = form.error;
    }
  }
</script>

<h1 class="h1 text-2xl">Активируйте свой аккаунт</h1>
<form
  action="?/activation"
  method="POST"
  class="flex flex-col gap-4"
  use:enhance
>
  <TextInput
    label={"Введите код пришедший на вашу почту"}
    name={"activationCode"}
    warnText={error}
  ></TextInput>
  <button type="submit" class="btn variant-filled-primary self-center"
    >Подтвердить код</button
  >
</form>
