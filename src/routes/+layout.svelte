<script lang="ts">
    import '@skeletonlabs/skeleton/themes/theme-crimson.css';
    import '@skeletonlabs/skeleton/styles/skeleton.css';
    import { AppShell, Toast } from '@skeletonlabs/skeleton';
    import Header from '$lib/components/Header.svelte';
    import "../app.postcss";
    import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

    export let data;
    let isLoggedIn: boolean = false;

    onMount(async () => {
        if(data.isLoggedIn){
            isLoggedIn = data.isLoggedIn;
        }
    });

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
            <Header isLoggedIn={isLoggedIn}/>
        </svelte:fragment>
        <main>
            <slot></slot>
        </main>
    </AppShell>
    <Toast />
</QueryClientProvider>

<style>

</style>