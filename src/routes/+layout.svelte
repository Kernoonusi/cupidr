<script lang="ts">
    import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
    import '@skeletonlabs/skeleton/styles/skeleton.css';
    import { AppShell } from '@skeletonlabs/skeleton';
    import Header from '$lib/components/Header.svelte';
    import "../app.postcss";
</script>

<AppShell slotSidebarRight="bg-surface-500/5 w-56 p-4">
    <svelte:fragment slot="header"><Header/></svelte:fragment>
    <main>
        <slot></slot>
    </main>
</AppShell>

<style>

</style>