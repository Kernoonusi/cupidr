<script lang="ts">
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import { ZodError, z } from "zod";
    import { user } from '$lib/stores/user';

//TODO: доделай верефикацию, сделай красоту
    const regSchemas = [
        z.object({
            name: z.string().trim().min(1).max(64),
            email: z.string().trim().email().min(1),
            pass: z.string().trim().min(8).max(64),
        }),
        z.object({
            birthDay: z.string().trim().min(10).max(10),
            age: z.number().min(16).max(99),
        }),
        z.object({
            gender: z.enum(['female', 'male']),
            lfGender: z.enum(['female', 'male', 'both']),
        }),
        z.object({
            geolocation: z.string().trim().min(1).max(64),
        }),
        z.object({
            bio: z.string().trim().max(512),
        }),
    ];

    let curStep = 0;
    let formDom:HTMLFormElement;
    let backButton: HTMLButtonElement;
    let regButton: HTMLButtonElement;
    let emailInput: HTMLInputElement;
    let passInput: HTMLInputElement;
    let nameInput: HTMLInputElement;
    let emailInputWarn: HTMLSpanElement;
    let passInputWarn: HTMLSpanElement;
    let nameInputWarn: HTMLSpanElement;
    let step1: HTMLDivElement;
    let step2: HTMLDivElement;
    let step3: HTMLDivElement;
    let step4: HTMLDivElement;

    export let form;

    let regData = [
        {
            name: "",
            email: "",
            pass: "",
        },
        {
            birthDay: "",
            age: 0,
        },
        {
            gender: "",
            lfGender: "",
        },
        {
            geolocation: "",
        },
        {
            bio: "",
        },
    ];

    $: {
        console.log(curStep);
        
        regData[1].age = getAge(regData[1].birthDay!);
        if(form?.error){
            formError();
        }
    }

    function formError(){
        switch(form!.error){
            case "Пользователь с таким email уже существует":
                goto(`#step1`);
                addWarn(emailInput, emailInputWarn, "Эта почта уже зарегистрирована");
                break;
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

    function initializeFirstStep(){
        passInput.classList.remove('input-error');
        passInputWarn.classList.replace('block', 'hidden');
        emailInput.classList.remove('input-error');
        emailInputWarn.classList.replace('block', 'hidden');
        nameInput.classList.remove('input-error');
        nameInputWarn.classList.replace('block', 'hidden');
    }

    function addWarn(input:HTMLInputElement, inputWarn:HTMLSpanElement, warnText:string){
        input.classList.add('input-error');
        inputWarn.classList.replace('hidden', 'block');
        inputWarn.innerText = warnText;
    }

    function nextStep(){
        try{
            regSchemas[curStep].parse(regData[curStep]);
            if(curStep == 4)
                regButton.type = "submit";
            if(curStep <= 4){
                goto(`#step${curStep + 2}`);
                if(curStep == 0)
                    initializeFirstStep();
            }
            curStep++;
        }catch(err: unknown){
            if(err instanceof ZodError){
                console.log(err);
                for (let i = 0; i < err.errors.length; i++) {
                    switch(err.errors[i].message){
                        case "String must contain at least 8 character(s)":
                            addWarn(passInput, passInputWarn, "Пароль минимум 8 символов");
                            break;
                        case "Invalid email":
                            addWarn(emailInput, emailInputWarn, "Введите почту");
                            break;
                        case "String must contain at least 1 character(s)":
                            addWarn(nameInput, nameInputWarn, "Введите имя");
                            break;
                    }
                }
            }
        }
    }
</script>

<main class="m-auto flex flex-col max-w-3xl justify-center items-center gap-4 mt-5">
    <div class="card py-4 variant-soft flex flex-col items-center gap-4">
        <h1 class="h1 text-center text-2xl">Регистрация</h1>
        <form action="?/registration" method="POST" bind:this={formDom} use:enhance class="relative overflow-hidden"> 
            <div class="flex flex-col p-4 items-center transition-all snap-y overflow-y-scroll form-div">
                <section class="flex flex-col gap-2" id="step1">
                    <label class="label flex flex-col w-80 gap-2 snap-start">
                        <span>Имя</span>
                        <input type="text" class="input p-2" name="user-name" bind:this={nameInput} bind:value={regData[0].name} autocomplete="name" placeholder="Иван" required>
                        <span class="text-red-600 hidden warn" bind:this={nameInputWarn}></span>
                    </label>
                    <label class="label flex flex-col w-80 gap-2">
                        <span>Почта</span>
                        <input type="email" class="input p-2" name="user-email" bind:this={emailInput} bind:value={regData[0].email} autocomplete="email" placeholder="example@mail.com" required>
                        <span class="text-red-600 hidden warn" bind:this={emailInputWarn}></span>
                    </label>
                    <label class="label flex flex-col w-80 gap-2">
                        <span>Пароль</span>
                        <input type="password" class="input p-2" name="user-pass" bind:this={passInput} bind:value={regData[0].pass} autocomplete="new-password" placeholder="Мин. 8 символов" required>
                        <span class="text-red-600 hidden warn" bind:this={passInputWarn}></span>
                    </label>
                </section>

                <section class="flex flex-col snap-start" id="step2">
                    <label class="label flex flex-col w-80 gap-2">
                        <span>Дата рождения</span>
                        <input type="date" class="input p-2" name="user-birthday" bind:value={regData[1].birthDay} required>
                        <!-- <span class="text-red-600 hidden warn"></span> -->
                    </label>
                </section>
                
                <section class="flex flex-col gap-4 snap-start" id="step3">
                    <span class="text-2xl text-center">Ваш пол</span>
                    <div class="flex flex-col items-center justify-center gap-4">
                        <label class="flex justify-center items-center">
                            <input type="radio" class="radio hidden" value="female" bind:group={regData[2].gender} name="user-sex" required>
                            {#if regData[2].gender == 'female'}
                                <p class="btn w-48 py-5 variant-filled-primary">Девушка</p>
                            {:else}
                                <p class="btn w-48 py-5 variant-filled-surface">Девушка</p>
                            {/if}
                        </label>
                        <label class="flex justify-center items-center">
                            <input type="radio" class="radio hidden" value="male" bind:group={regData[2].gender} name="user-sex" required>
                            {#if regData[2].gender == 'male'}
                                <p class="btn w-48 py-5 variant-filled-primary">Мужик</p>
                            {:else}
                                <p class="btn w-48 py-5 variant-filled-surface">Мужик</p>
                            {/if}
                        </label>      
                    </div>
                    <span class="text-2xl text-center">Я ищу</span>
                    <div class="flex flex-col items-center justify-center gap-4">
                        <label class="flex justify-center items-center">
                            <input type="radio" class="radio hidden" value="female" bind:group={regData[2].lfGender} name="user-prefer" required>
                            {#if regData[2].lfGender == 'female'}
                                <p class="btn w-48 py-5 variant-filled-primary">Девушек</p>
                            {:else}
                                <p class="btn w-48 py-5 variant-filled-surface">Девушек</p>
                            {/if}    
                        </label>
                        <label class="flex justify-center items-center">
                            <input type="radio" class="radio hidden" value="male" bind:group={regData[2].lfGender} name="user-prefer" required>
                            {#if regData[2].lfGender == 'male'}
                                <p class="btn w-48 py-5 variant-filled-primary">Мужиков</p>
                            {:else}
                                <p class="btn w-48 py-5 variant-filled-surface">Мужиков</p>
                            {/if}
                        </label>          
                        <label class="flex justify-center items-center">
                            <input type="radio" class="radio hidden" value="both" bind:group={regData[2].lfGender} name="user-prefer" required>
                            {#if regData[2].lfGender == 'both'}
                                <p class="btn w-48 py-5 variant-filled-primary">Всех</p>
                            {:else}
                                <p class="btn w-48 py-5 variant-filled-surface">Всех</p>
                            {/if}
                        </label>
                    </div>
                </section>

                <section class="flex flex-col snap-start" id="step4">
                    <label class="label flex flex-col w-80 gap-2">
                        <span>Ваше местоположение</span>
                        <input class="input p-2" type="text" placeholder="Ваш город" name="user-geo" bind:value={regData[3].geolocation} autocomplete="address-level1" required/>
                    </label>
                </section>

                <section class="flex flex-col snap-start" id="step5">
                    <label class="label flex flex-col w-80 gap-2">
                        <span>Расскажите о себе (необязательно)</span>
                        <textarea class="textarea p-2" rows="4" placeholder="О себе" name="user-bio" bind:value={regData[4].bio}/>
                    </label>                    
                </section>
                <br>
            </div>
            <button type="button" on:click={() => nextStep()} class="btn-icon btn-icon-xl variant-filled-primary absolute bottom-3 left-2/4 -translate-x-2/4" bind:this={regButton}><i class="fa-solid fa-arrow-right fa-2xl"></i></button>
        </form>
    </div>
    <a href="auth/login" class="have-user">Уже есть аккаунт?</a>
</main>

<style lang="scss">
    .have-user:hover{
        text-decoration: underline;
    }
    .form-div{
        height: 70vh;
        gap: 100%;
    }
    .form-div::-webkit-scrollbar {
        display: none;
    }
</style>