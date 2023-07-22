<script lang="ts">
    import '@skeletonlabs/skeleton/themes/theme-crimson.css';
    import '@skeletonlabs/skeleton/styles/skeleton.css';
    import { AppShell, Toast } from '@skeletonlabs/skeleton';
    import Header from '$lib/components/Header.svelte';
    import "../app.postcss";
    import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
    import { browser } from '$app/environment';

    const queryClient = new QueryClient({
        defaultOptions: {
        queries: {
            enabled: browser,
        },
        },
    });
</script>

<QueryClientProvider client={queryClient}>
    <AppShell>
        <svelte:fragment slot="header">
            <Header/>
        </svelte:fragment>
        <main>
            <slot></slot>
        </main>
    </AppShell>
    <Toast />
</QueryClientProvider>

<style>

</style>