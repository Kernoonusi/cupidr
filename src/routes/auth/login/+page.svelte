<script lang="ts">

</script>

<main class="m-auto flex flex-col max-w-3xl justify-center items-center gap-4 mt-5">
    <form action="?/login" class="card p-4 variant-soft flex flex-col items-center gap-4" method="POST">
        <h1 class="text-center text-2xl">Войти</h1>
        <label class="label w-80">
            <span>Почта</span>
            <input type="email" class="input p-2" name="user-email" autocomplete="email" required>
        </label>
        <label class="label w-80">
            <span>Пароль</span>
            <input type="password" class="input p-2" name="user-pass" autocomplete="current-password" required>
        </label>
        <button type="submit" class="btn variant-filled-primary">Войти</button>
    </form>
    <a href="/auth" class="have-user">Нет аккаунта?</a>
</main>

<style lang="scss">
    .have-user:hover{
        text-decoration: underline;
    }
</style>