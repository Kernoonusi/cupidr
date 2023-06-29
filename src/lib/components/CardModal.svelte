<script lang="ts">
    import Carousel from './Carousel.svelte'
    import { clickOutside } from './click_outside';

    
    // export let photos = [""];
    export let name: string;
    export let desc: string;
    export let isOpen: boolean;
</script>

{#if isOpen}
    <div class="modalcard " use:clickOutside on:outclick={() => isOpen = !isOpen}>
        <!-- Потом замени когда API допилят -->
        <!-- <Carousel photos={data.avatar}/> -->
        <Carousel/>
        <div class="text-container">
            <h1>{name}</h1>
            <p>jakgubibguibbbuabibg</p>
            <p>3 fucks gived</p>
            <hr>
            <p>{desc}</p>
            <hr>
            <p>Здесь типо что-нить прикольное сделай</p>
        </div>
    </div>
{/if}

<style lang="scss">
    .modalcard{
        position: fixed;
        z-index: 10;
        top: 52%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: black;
        border-radius: 20px;
        padding: 20px;
        height: 620px;
        width: 80vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all .5s ease;
        .text-container{
            display: flex;
            flex-direction: column;
            color: black;
        }
    }
</style>