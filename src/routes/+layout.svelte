<script lang="ts">
    import '@skeletonlabs/skeleton/themes/theme-crimson.css';
    import '@skeletonlabs/skeleton/styles/skeleton.css';
    import { AppBar, AppShell, Toast } from '@skeletonlabs/skeleton';
    import "../app.postcss";
    import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import { beforeNavigate, goto } from '$app/navigation';
    import { fly } from 'svelte/transition';

    export let data;
    let navDestination: number;
    let isLoggedIn: boolean = false;

    // beforeNavigate((e) => {
    //     if(e.to?.url.pathname == '/' && e.from?.url.pathname == '/user'){
    //         navDestination = 400;
    //     }
    //     else if(e.to?.url.pathname == '/' && e.from?.url.pathname == '/chat'){
    //         navDestination = -400;
    //     }
    // });
    
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
            <AppBar regionPage="relative" slotPageHeader="sticky top-0 z-10" gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
                <svelte:fragment slot="lead"><button on:click={() => {goto(`/user`); navDestination = -400}} class="btn variant-glass {isLoggedIn ? '' : 'hidden'} " data-sveltekit-preload-data="hover"><i class="fa-solid fa-user fa-2xl"></i></button></svelte:fragment>
                <a href="/" on:click={() => navDestination = data.url?.split('/')[1] == 'user' ? 400 : data.url?.split('/')[1] == 'chat' ? -400 : navDestination} class="text-4xl">CUPIDR</a>
                <svelte:fragment slot="trail"><button on:click={() => {goto(`/chat`); navDestination = 400}} class="btn variant-glass {isLoggedIn ? '' : 'hidden'}" data-sveltekit-preload-data="hover"><i class="fa-solid fa-comments fa-2xl"></i></button></svelte:fragment>
            </AppBar>
        </svelte:fragment>
        {#key data.url?.split('/')[1]}
            <main
            in:fly={{ delay: 300, x: navDestination }}
            out:fly={{ duration: 300, x: navDestination * -1 }}
            >
                <slot></slot>
            </main>
        {/key}
    </AppShell>
    <Toast />
</QueryClientProvider>