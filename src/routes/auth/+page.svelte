<script lang="ts">
    import { enhance } from "$app/forms";
    import { z } from "zod";

    const regSchemaStep1 = z.object({
        name: z.string().trim().min(1).max(64),
        email: z.string().trim().email().min(1),
        pass: z.string().trim().min(8).max(64),
    });
    const regSchemaStep2 = z.object({
        birthDay: z.string().trim().min(10).max(10),
        age: z.number().min(16).max(99),
        gender: z.enum(['female', 'male']),
        lfGender: z.enum(['female', 'male', 'both']),
    });
    const regSchemaStep3 = z.object({
        geolocation: z.string().trim().min(1).max(64),
        bio: z.string().trim().max(512),
    });

    let curStep = 0;
    let birthDay: string;
    let regButton: HTMLButtonElement;
    let step1: HTMLDivElement;
    let step2: HTMLDivElement;
    let step3: HTMLDivElement;
    let step4: HTMLDivElement;
    let regDataStep1: object;
    let regDataStep2: object;
    let regDataStep3: object;

    let regData = {
        name: "",
        email: "",
        pass: "",
        age: 0,
        gender: "",
        lfGender: "",
        bio: "",
        geolocation: "",
        photo: File,
    };

    $: {
        regData.age = getAge(birthDay);
        regDataStep1 = {
            name: regData.name,
            email: regData.email,
            pass: regData.pass
        }
        regDataStep2 = {
            birthDay: birthDay,
            age: regData.age,
            gender: regData.gender,
            lfGender: regData.lfGender
        }
        regDataStep3 = {
            geolocation: regData.geolocation,
            bio: regData.bio
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

    function regNextStep(){
        let data;
        switch(curStep){
            case 0:
                data = regSchemaStep1.safeParse(regDataStep1);
                if(data.success){
                    regButton.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
                    regButton.classList.replace('btn', 'btn-icon')
                    regButton.classList.add('btn-xl');
                    step1.style.display = "none";
                    step2.style.display = "flex";
                    curStep++;
                }
                else{
                    console.log(data);
                }
                break;
            case 1:
                data = regSchemaStep2.safeParse(regDataStep2);
                if(data.success){
                    step2.style.display = "none";
                    step3.style.display = "flex";
                    curStep++;
                }
                else{
                    console.log(data);
                }
                break;
            case 2:
                data = regSchemaStep3.safeParse(regDataStep3);
                if(data.success){
                    regButton.style.display = "none";
                    step3.style.display = "none";
                    step4.style.display = "flex";
                    curStep++;
                }
                else{
                    console.log(data);
                }
                break;
            default:
                break;
        }
    }
</script>

<main class="m-auto flex flex-col max-w-3xl justify-center items-center gap-4 mt-5">
    <div class="card p-4 variant-soft flex flex-col items-center gap-4">
        <h1 class="h1 text-center text-2xl">Зарегистрироваться</h1>
        <form method="POST" action="?/registration" use:enhance>
            <div class="flex flex-col items-center gap-4 transition-all" bind:this={step1}>
                <label class="label flex flex-col w-80 gap-2">
                    <span>Никнейм</span>
                    <input type="text" class="input p-2" name="user-name" bind:value={regData.name} required>
                </label>
                <label class="label flex flex-col w-80 gap-2">
                    <span>Почта</span>
                    <input type="email" class="input p-2" name="user-email" bind:value={regData.email} autocomplete="email" required>
                </label>
                <label class="label flex flex-col w-80 gap-2">
                    <span>Пароль</span>
                    <input type="password" class="input p-2" name="user-pass" bind:value={regData.pass} required>
                </label>
            </div>
            <div class="flex-col items-start gap-4 hidden transition-all" bind:this={step2}>
                <label class="label flex flex-col w-80 gap-2">
                    <span>Дата рождения</span>
                    <input type="date" class="input p-2" name="user-birthday" bind:value={birthDay} required>
                </label>
                <span>Пол</span>
                <div class="flex flex-col gap-2">
                    <label class="flex items-center space-x-2">
                        <input type="radio" class="radio" value="female" bind:group={regData.gender} name="user-sex" required>
                        <p>Женский</p>
                    </label>
                    <label class="flex items-center space-x-2">
                        <input type="radio" class="radio" value="male" bind:group={regData.gender} name="user-sex" required>
                        <p>Мужской</p>
                    </label>          
                </div>
                <span>Я ищу</span>
                <div class="flex flex-col gap-2">
                    <label class="flex items-center space-x-2">
                        <input type="radio" class="radio" value="female" bind:group={regData.lfGender} name="user-prefer" required>
                        <p>Женщин</p>
                    </label>
                    <label class="flex items-center space-x-2">
                        <input type="radio" class="radio" value="male" bind:group={regData.lfGender} name="user-prefer" required>
                        <p>Мужчин</p>
                    </label>          
                    <label class="flex items-center space-x-2">
                        <input type="radio" class="radio" value="both" bind:group={regData.lfGender} name="user-prefer" required>
                        <p>Всех</p>
                    </label>
                </div>
            </div>
            <div class="flex-col items-start gap-4 hidden transition-all" bind:this={step3}>
                <label class="label flex flex-col w-80 gap-2">
                    <span>Ваше местоположение</span>
                    <input class="input p-2" type="text" placeholder="Ваш город" name="user-geo" bind:value={regData.geolocation} required/>
                </label>
                <label class="label w-80">
                    <span>Расскажите о себе (необязательно)</span>
                    <textarea class="textarea p-2" rows="4" placeholder="О себе" name="user-bio" bind:value={regData.bio}/>
                </label>
            </div>
            <div class="flex-col items-start gap-4 hidden transition-all" bind:this={step4}>
                <label class="label flex flex-col w-80 gap-2">
                    <span>Добавьте свою фотографию (необязательно)</span>
                    <input class="input" type="file" name="user-photo" bind:value={regData.photo}/>
                </label>
                <button type="submit" on:click={() => regNextStep()} class="btn variant-filled-primary self-center">Пропустить и зарегистрироваться</button>
            </div>
        </form>
        <button on:click={() => regNextStep()} class="btn variant-filled-primary" bind:this={regButton}>Зарегистрироваться</button>
    </div>
    <a href="/auth/login" class="have-user">Уже есть аккаунт?</a>
</main>

<style lang="scss">
    .have-user:hover{
        text-decoration: underline;
    }
</style>