<script lang="ts">
    import { invalidate } from '$app/navigation';
    import kyApi from '$lib/api/kyApi';
    import type { UserResponse } from '$lib/types';
    import { createQuery } from '@tanstack/svelte-query';
    import type { PageData } from './$types';
    import { PUBLIC_APIURL } from '$env/static/public';
    import { ProgressRadial, Avatar } from '@skeletonlabs/skeleton';
    import AvatarWithName from '$lib/components/AvatarWithName.svelte';
    import { onMount } from 'svelte';
    import PassInput from '$lib/components/PassInput.svelte';
  import ErrorAlert from '$lib/components/ErrorAlert.svelte';

    let userData: UserResponse;
    let errVisible: boolean = false;
    let errMessage: string;
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
                                invalidate('/user');
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
    <form action="?/updatePassword" method="POST" class="flex flex-col gap-4 mt-6">
        <h2 class="h2 text-center">Изменить пароль</h2>
        <PassInput label={'Новый пароль'} name={'user-password'}></PassInput>
        <PassInput label={'Подтвердите новый пароль'} name={'user-conf-password'}></PassInput>
        
        <button type="submit" class="btn variant-filled-tertiary mt-6">Ок</button>
    </form>
    <ErrorAlert errMessage={errMessage} errVisible={errVisible}></ErrorAlert>
{/if}