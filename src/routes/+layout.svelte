<script lang="ts">
    import '@skeletonlabs/skeleton/themes/theme-crimson.css';
    import '@skeletonlabs/skeleton/styles/skeleton.css';
    import { AppShell } from '@skeletonlabs/skeleton';
    import Header from '$lib/components/Header.svelte';
    import "../app.postcss";
    import accessToken from '$lib/stores/accessToken';
    import { goto } from '$app/navigation';
</script>

<AppShell slotSidebarRight="bg-surface-500/5 w-56 p-4">
    <svelte:fragment slot="header"><Header/></svelte:fragment>
    <main>
        <slot></slot>
    </main>
</AppShell>

<style>

</style>