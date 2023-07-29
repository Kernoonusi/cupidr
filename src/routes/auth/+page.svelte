<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import DateInput from "$lib/components/DateInput.svelte";
  import TextInput from "$lib/components/TextInput.svelte";
  import EmailInput from "$lib/components/EmailInput.svelte";
  import { ZodError, z } from "zod";
  import PassInput from "$lib/components/PassInput.svelte";
  import { citiesOptions } from "$lib/cities";
  import { Autocomplete } from "@skeletonlabs/skeleton";

  const regSchemas = [
    z.object({
      name: z.string().trim().min(1, { message: "Введите имя" }).max(64),
      email: z
        .string()
        .trim()
        .min(1, { message: "Введите почту" })
        .email({ message: "Введите почту" }),
      pass: z
        .string()
        .trim()
        .min(8, { message: "Пароль минимум 8 символов" })
        .max(64, { message: "Пароль не больше 64 символов" }),
    }),
    z.object({
      age: z.number().min(16, { message: "Вам мало лет, сайт 16+" }).max(99),
      birthDay: z
        .string()
        .trim()
        .min(10, { message: "Введите дату рождения" })
        .max(10),
    }),
    z.object({
      gender: z.enum(["female", "male"]),
      lfGender: z.enum(["female", "male", "both"]),
    }),
    z.object({
      geolocation: z
        .string()
        .trim()
        .min(1, { message: "Введите ваше местоположение" })
        .max(64),
    }),
    z.object({
      bio: z.string().trim().max(1024, { message: "Максимум 1024 символов" }),
    }),
  ];

  let curStep = 0;
  let formDom: HTMLFormElement;
  let regButton: HTMLButtonElement;
  let emailInputWarn: string;
  let passInputWarn: string;
  let nameInputWarn: string;
  let birthdayInputWarn: string;
  let genderWarn: string;
  let lfGenderWarn: string;
  let geoInputWarn: string;
  let bioInputWarn: string;

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
    regData[1].age = getAge(regData[1].birthDay!);
    if (form?.error) {
      formError();
    }
  }

  function formError() {
    switch (form!.error) {
      case "Пользователь с таким email уже существует":
        goto(`#step1`);
        emailInputWarn = "Эта почта уже зарегистрирована";
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

  function nextStep() {
    try {
      regSchemas[curStep].parse(regData[curStep]);
      if (curStep == 4) regButton.type = "submit";
      if (curStep <= 4) {
        goto(`#step${curStep + 2}`);
        if (curStep == 0)
          [passInputWarn, emailInputWarn, nameInputWarn] = ["", "", ""];
      }
      curStep++;
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        console.log(err);

        for (let i = 0; i < err.errors.length; i++) {
          switch (err.errors[i].path[0]) {
            case "name":
              nameInputWarn = err.errors[i].message;
              break;
            case "email":
              emailInputWarn = err.errors[i].message;
              break;
            case "pass":
              passInputWarn = err.errors[i].message;
              break;
            case "age":
              birthdayInputWarn = err.errors[i].message;
              break;
            case "birthDay":
              birthdayInputWarn = err.errors[i].message;
              break;
            case "gender":
              genderWarn = "Укажите ваш пол";
              break;
            case "lfGender":
              lfGenderWarn = "Укажите пол человека которого вы ищете";
              break;
            case "geolocation":
              geoInputWarn = err.errors[i].message;
              break;
            case "bio":
              bioInputWarn = err.errors[i].message;
              break;
          }
        }
      }
    }
  }
</script>

<h2 class="h2 text-center">Регистрация</h2>
<form
  action="?/registration"
  method="POST"
  bind:this={formDom}
  use:enhance
  class="relative overflow-hidden mt-4"
>
  <div
    class="flex flex-col p-4 items-center transition-all snap-y overflow-y-scroll form-div scroll-smooth"
  >
    <section class="flex flex-col gap-4 w-80 snap-start" id="step1">
      <TextInput
        label={"Имя"}
        name={"user-name"}
        bind:warnText={nameInputWarn}
        bind:value={regData[0].name}
        autocomplete={"name"}
        placeholder="Иван"
      ></TextInput>
      <EmailInput
        label={"Почта"}
        name={"user-email"}
        bind:warnText={emailInputWarn}
        bind:value={regData[0].email}
        autocomplete={"email"}
        placeholder="example@mail.com"
      ></EmailInput>
      <PassInput
        label={"Пароль"}
        name={"user-password"}
        bind:warnText={passInputWarn}
        bind:value={regData[0].pass}
        autocomplete={"new-password"}
        placeholder="Мин. 8 символов"
      ></PassInput>
    </section>

    <section class="flex flex-col w-80 snap-start" id="step2">
      <DateInput
        label={"Дата рождения"}
        name={"user-birthday"}
        bind:warnText={birthdayInputWarn}
        bind:value={regData[1].birthDay}
        autocomplete={"birthday"}
      ></DateInput>
    </section>

    <section class="flex flex-col gap-4 snap-start" id="step3">
      <span class="text-2xl text-center">Ваш пол</span>
      <div class="flex flex-col items-center justify-center gap-4">
        <label class="flex justify-center items-center">
          <input
            type="radio"
            class="radio hidden"
            value="female"
            bind:group={regData[2].gender}
            name="user-sex"
            required
          />
          <p
            class="btn w-48 py-5 {regData[2].gender == 'female'
              ? 'variant-filled-primary'
              : 'variant-filled-surface'}"
          >
            Девушка
          </p>
        </label>
        <label class="flex justify-center items-center">
          <input
            type="radio"
            class="radio hidden"
            value="male"
            bind:group={regData[2].gender}
            name="user-sex"
            required
          />
          <p
            class="btn w-48 py-5 {regData[2].gender == 'male'
              ? 'variant-filled-primary'
              : 'variant-filled-surface'}"
          >
            Мужик
          </p>
        </label>
      </div>
      {#if genderWarn}
        <span class="text-red-600 warn">{genderWarn}</span>
      {/if}
      <span class="text-2xl text-center">Я ищу</span>
      <div class="flex flex-col items-center justify-center gap-4">
        <label class="flex justify-center items-center">
          <input
            type="radio"
            class="radio hidden"
            value="female"
            bind:group={regData[2].lfGender}
            name="user-prefer"
            required
          />
          <p
            class="btn w-48 py-5 {regData[2].lfGender == 'female'
              ? 'variant-filled-primary'
              : 'variant-filled-surface'}"
          >
            Девушек
          </p>
        </label>
        <label class="flex justify-center items-center">
          <input
            type="radio"
            class="radio hidden"
            value="male"
            bind:group={regData[2].lfGender}
            name="user-prefer"
            required
          />
          <p
            class="btn w-48 py-5 {regData[2].lfGender == 'male'
              ? 'variant-filled-primary'
              : 'variant-filled-surface'}"
          >
            Мужиков
          </p>
        </label>
        <label class="flex justify-center items-center">
          <input
            type="radio"
            class="radio hidden"
            value="both"
            bind:group={regData[2].lfGender}
            name="user-prefer"
            required
          />
          <p
            class="btn w-48 py-5 {regData[2].lfGender == 'both'
              ? 'variant-filled-primary'
              : 'variant-filled-surface'}"
          >
            Всех
          </p>
        </label>
      </div>
      {#if lfGenderWarn}
        <span class="text-red-600 warn">{lfGenderWarn}</span>
      {/if}
    </section>

    <section class="flex flex-col w-80 snap-start" id="step4">
      <TextInput
        label={"Ваше местоположение"}
        name={"user-geo"}
        bind:warnText={geoInputWarn}
        bind:value={regData[3].geolocation}
        autocomplete={"address-level1"}
        placeholder="Ваш город"
      ></TextInput>
      <div class="max-h-60 mt-6 overflow-y-auto" tabindex="-1">      
        <Autocomplete bind:input={regData[3].geolocation} options={citiesOptions} on:selection={(e) => regData[3].geolocation = e.detail.label}></Autocomplete>
      </div>
    </section>

    <section class="flex flex-col snap-start" id="step5">
      <label class="label flex flex-col w-80 gap-2">
        <span>Расскажите о себе (необязательно)</span>
        <textarea
          class="textarea p-2"
          rows="4"
          placeholder="О себе"
          name="user-bio"
          bind:value={regData[4].bio}
        />
      </label>
      {#if bioInputWarn}
        <span class="text-red-600 warn">{bioInputWarn}</span>
      {/if}
    </section>
    <br />
  </div>
  <button
    type="button"
    on:click={() => nextStep()}
    class="btn-icon btn-icon-xl variant-filled-primary absolute bottom-3 left-2/4 -translate-x-2/4"
    bind:this={regButton}><i class="fa-solid fa-arrow-right fa-2xl"></i></button
  >
</form>
<a href="auth/login" class="hover:underline">Уже есть аккаунт?</a>

<style lang="scss">
  .form-div {
    height: 70vh;
    gap: 100%;
  }
  .form-div::-webkit-scrollbar {
    display: none;
  }
</style>
