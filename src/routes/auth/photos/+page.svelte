<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<h1 class="h1 text-center text-2xl">Регистрация</h1>
<form
  action="?/uploadPhotos"
  method="POST"
  use:enhance
  enctype="multipart/form-data"
  class="flex flex-col gap-4 mt-6"
>
  <label class="label flex flex-col w-80 gap-2">
    <span>Добавьте свою(-и) фотографию(-и) макс. 5</span>
    <input class="input" type="file" name="file" multiple />
  </label>
  <button
    type="submit"
    class="btn variant-filled-primary justify-self-center self-center"
    >Зарегистрироваться</button
  >
</form>
