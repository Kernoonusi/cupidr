<script lang="ts">
    export let value: string = "";
    export let label: string = "";
    export let name: string;
    export let autocomplete: string = 'off';
    export let placeholder: string | null = null;
    export let required: boolean = true;
    export let warnText: string = "";
</script>

<label class="label flex flex-col w-full gap-2">
    {#if label}
        <span>{label}</span>
    {/if}
    <input type="text" class="input p-2 {warnText ? 'input-error' : ''}" name="{name}" bind:value autocomplete="{autocomplete}" required={required} placeholder={placeholder}>
    {#if warnText}
        <span class="text-red-600 warn">{warnText}</span>
    {/if}
</label>