<script lang="ts">
    import { onMount, afterUpdate } from 'svelte';
    let slider: HTMLDivElement;
    let width: number;
    let sliderLine: HTMLDivElement;
    let images: NodeListOf<HTMLImageElement>;
    let count: number;

    onMount(async () => {
		images = slider.querySelectorAll('.slides .slide img');
	});
    afterUpdate(() => {
        width = slider.offsetWidth;
        sliderLine.style.width = width * images.length + 'px';
        images.forEach(item => {
            item.style.width = width + 'px';
            item.style.height = 'auto';
        });
        rollSlider()
    });
    function rollSlider() {
        sliderLine.style.transform = 'translate(-' + count * width + 'px)';
    }
    let photos = ["https://loremflickr.com/640/480/people", "https://loremflickr.com/cache/resized/65535_52448613841_9e4102e916_b_640_480_nofilter.jpg", "https://loremflickr.com/cache/resized/65535_52275289172_fb01555de1_z_640_480_nofilter.jpg"];
    // export let photos = [""];
</script>

<div class="slider" bind:this={slider}>
    <div class="slides" bind:this={sliderLine}>
        {#each photos as photo, i}
            {#if i == 0}
                <input type="radio" name="r" id="r{i}" bind:group={count} value="{i}" checked>
            {:else}
                <input type="radio" name="r" id="r{i}" bind:group={count} value="{i}">
            {/if}
            <div class="slide"><img src="{photo}" alt="{photo}"></div>
        {/each}
    </div>

    <div class="navigation">
        {#each photos as photo, i}
            <label for="r{i}" class="bar"></label>
        {/each}
    </div>
</div>

<style lang="scss">
    .slider{
        width: 700px;
        height: 400px;
        overflow: hidden;
        position: relative;
        border-radius: 40px;
        .slides{
            display: flex;
            background: orange;
            position: relative;
            left: 0;
            transition: all ease 1s;
            input[name="r"]{
                position: absolute;
                visibility: hidden;
            }
        }
        .navigation{
            position: absolute;
            top: 16px;
            left: 50%;
            display: flex;
            transform: translateX(-50%);
            .bar{
                height: 8px;
                width: 30px;
                margin: 6px;
                cursor: pointer;
                opacity: .5;
                background-color: #ddd;
                border-radius: 10px;
                transition: .4s ease;
            }
            .bar:hover{
                transform: scale(1.1);
                opacity: 1;
            }
        }
        
    }
</style>