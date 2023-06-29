<script lang="ts">

</script>

<main class="m-auto flex flex-col max-w-3xl justify-center items-center gap-4 mt-5">
    <form action="?/login" class="card p-4 variant-soft flex flex-col items-center gap-4" method="post">
        <h1 class="text-center text-2xl">Войти</h1>
        <label class="label w-80">
            <span>Почта</span>
            <input type="text" class="input p-2" name="user-name">
        </label>
        <label class="label w-80">
            <span>Пароль</span>
            <input type="password" class="input p-2" name="user-pass">
        </label>
        <button type="submit" class="btn variant-filled-primary">Войти</button>
    </form>
</main>