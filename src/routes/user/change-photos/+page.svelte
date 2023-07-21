<script lang="ts">
    import { invalidate } from '$app/navigation';
    import kyApi from '$lib/api/kyApi';
    import type { UserResponse } from '$lib/types';
    import { createQuery } from '@tanstack/svelte-query';
    import type { PageData } from './$types';
    import { PUBLIC_APIURL } from '$env/static/public';
    import { FileDropzone, ProgressRadial} from '@skeletonlabs/skeleton';
    import AvatarWithName from '$lib/components/AvatarWithName.svelte';
    import { onMount } from 'svelte';
    import { enhance } from '$app/forms';
    import { scale } from 'svelte/transition';

    let userData: UserResponse;
    let errVisible: boolean = false;
    let errMessage: string;
    let photos: HTMLDivElement[] = [];
    let formElem: HTMLFormElement;
    export let data: PageData;
    export let form;

    async function authorization() {
        try{
            let user: UserResponse = await kyApi.get('users/me', {
                headers: {
                    Authorization: `Bearer ${data.accessToken}`,
                    token: data.refreshToken,
                },
                hooks: {
                    afterResponse: [
                        async (_request, _options, response) => {
                            if (response.status === 401){                           
                                invalidate('/user/change-photos');
                            }
                        }
                    ]
                }
            }).json();
            return user;
        }catch(err: unknown){
            console.log(err);
        }
    }

    function deletePhoto(index: number){
        userData.UserPhoto.splice(index, 1);
    }
    
    function makePhotoProfile(index: number){
        userData.UserPhoto.forEach((element, index) => {
            if(element.isProfile){
                userData.UserPhoto[index].isProfile = false;
            }
        });
        userData.UserPhoto[index].isProfile = true;
    }

    const user = createQuery({
        queryKey: ['user'],
        queryFn: () => authorization(),
        initialData: data.user,
    });

    $: {
        if($user.data){
            userData = $user.data;     
        }
        else if(data.user){
            userData = data.user;
        }
    }

    onMount(() => {
        if(form?.error && !errVisible){
            errVisible = !errVisible;
            errMessage = form.error;
        }
    });
</script>

{#if $user.isLoading}
    <div class="flex justify-center mt-64">
        <ProgressRadial />
    </div>        
{:else if $user.isError}
    <p>Error: {$user.error.message}</p>
{:else if ($user.isSuccess && userData)}
    <div>
        <h2 class="h2 mt-6 text-center">Ваши фото</h2>
        <section class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {#each userData.UserPhoto as photo, i}
                {#if userData.UserPhoto[i]}
                    <div out:scale|local bind:this={photos[i]} class="relative">
                        <form action="?/deletePhoto" method="post" use:enhance>
                            <input type="text" name="photoId" class="hidden" value="{photo.id}">
                            <button type="submit" class="btn-icon btn-icon-sm variant-filled absolute top-1 left-1" on:click={() => deletePhoto(i)}><i class="fa-solid fa-xmark fa-lg"></i></button>
                        </form>
                        <form action="?/makePhotoProfile" method="post" use:enhance on:submit|preventDefault={() => makePhotoProfile(i)}>
                            <input type="text" name="photoId1" class="hidden" value="{photo.id}" >
                            <button type="submit" class="btn-icon btn-icon-sm {userData.UserPhoto[i].isProfile ? 'variant-filled-primary' : 'variant-filled'} absolute top-1 right-1" ><i class="fa-solid fa-star fa-lg"></i></button>
                        </form>
                        <img class="h-auto rounded-lg" src={PUBLIC_APIURL + photo.photoUrl} alt="profile {photo.id}">
                    </div>
                {/if}
            {/each}
            <form action="?/uploadPhoto" bind:this={formElem} method="post" class="w-full" enctype="multipart/form-data">
                <FileDropzone name="file" multiple rounded="rounded-2xl" on:change={() => formElem.submit()}>
                    <svelte:fragment slot="lead"><i class="fa-solid fa-file-image fa-2xl"></i></svelte:fragment>
                    <svelte:fragment slot="message">Загрузите ваше фото</svelte:fragment>
                    <svelte:fragment slot="meta">PNG, JPG, JPEG</svelte:fragment>
                </FileDropzone>
            </form>
        <section>
    </div>
    {#if errVisible}
        <aside class="alert flex-row items-center gap-4 variant-filled-error absolute top-24 w-full">
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
{/if}

<style lang="scss">
    .grid-cols-2{
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (min-width: 768px) {
        .md\:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }
</style>