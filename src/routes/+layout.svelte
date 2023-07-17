<script lang="ts">
    import '@skeletonlabs/skeleton/themes/theme-crimson.css';
    import '@skeletonlabs/skeleton/styles/skeleton.css';
    import { AppShell } from '@skeletonlabs/skeleton';
    import Header from '$lib/components/Header.svelte';
    import "../app.postcss";
</script>

<AppShell>
    <svelte:fragment slot="header"><Header/></svelte:fragment>
    <main>
        <slot></slot>
    </main>
</AppShell>

<style>

</style>