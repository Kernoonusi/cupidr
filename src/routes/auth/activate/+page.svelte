<script lang="ts">
    import { enhance } from '$app/forms';
</script>

<div class="m-auto card w-fit mt-5 p-4 variant-soft flex flex-col items-center gap-4">
    <h1 class="h1 text-2xl">Активируйте свой аккаунт</h1>
    <form action="?/activation" method="POST" class="flex flex-col gap-4" use:enhance>
        <label class="label flex flex-col w-80 gap-2">
            <span>Введите код пришедший на вашу почту</span>
            <input class="input p-2" type="text" name="activationCode" required autocomplete="off"/>
        </label>
        <button type="submit" class="btn variant-filled-primary self-center">Подтвердить код</button>
    </form>
</div>