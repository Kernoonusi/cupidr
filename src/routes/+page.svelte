<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    export let data;

    onMount(() => {
        if(!data.loggedIn){
            goto(`/auth`);
        }
    });
</script>

<main class="">
    
</main>

<style lang="scss">
    
</style>