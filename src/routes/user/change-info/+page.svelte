<script lang="ts">
    import { invalidate } from '$app/navigation';
    import kyApi from '$lib/api/kyApi';
    import type { UserResponse } from '$lib/types';
    import { createQuery } from '@tanstack/svelte-query';
    import type { PageData } from './$types';
    import { PUBLIC_APIURL } from '$env/static/public';
    import { ProgressRadial, Avatar } from '@skeletonlabs/skeleton';
    import AvatarWithName from '$lib/components/AvatarWithName.svelte';
    import TextInput from '$lib/components/TextInput.svelte';
    import EmailInput from '$lib/components/EmailInput.svelte';
    import DateInput from '$lib/components/DateInput.svelte';
    import { onMount } from 'svelte';

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

    function getAge(dateString: string) {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
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
    <form action="?/updateUser" method="POST" class="flex flex-col gap-4 mt-6">
        <h2 class="h2 text-center">Личные данные</h2>
        <TextInput label={'Имя'} name={'user-name'} value={userData.name} autocomplete={'name'}></TextInput>
        <EmailInput label={'Почта'} name={'user-email'} value={userData.email} autocomplete={'email'}></EmailInput>
        <DateInput label={'Дата рождения'} name={'user-birthday'} value={userData.birthday.slice(0, 10)} autocomplete={'birthday'}></DateInput>
        <label class="label flex flex-col w-full gap-2">
            <span>Ваш пол</span>
            <select class="select p-2" name="user-sex" bind:value={userData.gender}>
                <option value="female">Девушка</option>
                <option value="male">Мужик</option>
            </select>
            <span class="text-red-600 hidden warn"></span>
        </label>
        <label class="label flex flex-col w-full gap-2">
            <span>Я ищу</span>
            <select class="select p-2" name="user-prefer" bind:value={userData.lfGender}>
                <option value="female">Девушек</option>
                <option value="male">Мужиков</option>
                <option value="both">Всех</option>
            </select>
            <span class="text-red-600 hidden warn"></span>
        </label>
        <TextInput label={'Ваше местоположение'} name={'user-geo'} value={userData.geolocation} autocomplete={'address-level1'}></TextInput>
        <label class="label flex flex-col w-full gap-2">
            <span>О себе</span>
            <textarea class="textarea p-2" rows="4" placeholder="О себе" name="user-bio" bind:value={userData.bio}/>
        </label>
        <button type="submit" class="btn variant-filled-tertiary mt-6">Ок</button>
    </form>
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