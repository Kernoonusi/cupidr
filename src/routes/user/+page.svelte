<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import type { UserResponse } from '$lib/types';
    
    let user: UserResponse;
    onMount(() => {
        user = JSON.parse(JSON.stringify(data));
        console.log(user);
    });
    export let data: PageData;
</script>

<main class="m-auto card w-fit mt-5 p-4 variant-soft flex flex-col items-center gap-4">
    {#if user}
        Привет, {user.name}
    {/if}
</main>