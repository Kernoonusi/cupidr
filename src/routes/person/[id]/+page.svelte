<script lang="ts">
    import type {PageData} from './$types';
    import { goto } from '$app/navigation';
    import CardModal from '$lib/components/CardModal.svelte';

    let isOpen = false;
    export let data: PageData;

    function like(){
        goto(`/person/${Math.ceil(Math.random() * 100)}`);
    }
    function dislike(){
        goto(`/person/${Math.ceil(Math.random() * 100)}`);
    }
</script>

<main class="mt-5 flex justify-center items-center gap-36">
    <button class="btn-icon btn-icon-xl btn-dislike variant-glass-tertiary" on:click={() => dislike()}><i class="fa-solid fa-x fa-2xl"></i></button>
    <div class="card ">
        <!-- Потом замени когда API допилят -->
        <!-- <Carousel photos={data.avatar}/> -->
        <button on:click={() => isOpen = !isOpen}><img src="{data.avatar}" alt="" class="avatar"></button>
        <div class="text-container">
            <h1>{data.name}, {data.age}</h1>
        </div>
    </div>
    <button class="btn-icon btn-icon-xl btn-like variant-glass-error" on:click={() => like()}><i class="fa-solid fa-heart fa-2xl"></i></button>
</main>
<CardModal name="{data.name}" desc="{data.desc}" bind:isOpen={isOpen}/>

<style lang="scss">
    .btn-dislike{
        width: 150px;
    }
    .btn-like{
        width: 150px;
    }
    .card{
        background-color: green;
        border-radius: 20px;
        padding: 20px;
        height: 600px;
        width: 800px;
        display: flex;
        flex-direction: column;
        align-items: center;
        button{
            display: flex;
            justify-content: center;
            border: 0;
            width: fit-content;
        }
        .avatar{
            height: 300px;
            border-radius: 20px;
        }
        .text-container{
            display: flex;
            flex-direction: column;
            color: black;
        }
    }
</style>