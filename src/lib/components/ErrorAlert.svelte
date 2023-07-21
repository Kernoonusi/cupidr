<script lang="ts">
    export let errMessage: string;
    export let errVisible: boolean;
</script>

{#if errVisible}
    <aside class="alert flex-row items-center gap-4 variant-filled-error sticky top-24 w-full">
        <i class="fa-solid fa-triangle-exclamation fa-xl"></i>
        <div class="alert-message">
            <h3 class="h3">Ошибка</h3>
            <p>{errMessage}</p>
        </div>
        <div class="alert-actions">
            <button class="btn bg-white" on:click={() => errVisible = false}>Ок</button>
        </div>
    </aside>
{/if}