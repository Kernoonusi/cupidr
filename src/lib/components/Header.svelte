<script lang="ts">
    import { AppBar } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
    <svelte:fragment slot="lead"><button on:click={() => goto(`/user`)} class="btn variant-glass" data-sveltekit-preload-data="hover"><i class="fa-solid fa-user fa-2xl"></i></button></svelte:fragment>
    <a href="/" class="logo">CUPIDR</a>
    <svelte:fragment slot="trail"><button on:click={() => goto(`/chat`)} class="btn variant-glass" data-sveltekit-preload-data="hover"><i class="fa-solid fa-comments fa-2xl"></i></button></svelte:fragment>
</AppBar>

<style lang="scss">
    .logo{
        font-size: 2rem;
    }
</style>