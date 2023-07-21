<script lang="ts">
    import { Avatar } from "@skeletonlabs/skeleton";

    export let src:string;
    export let name:string;
    export let email:string;
</script>

<Avatar width="w-40" src={src}></Avatar>
<div class="text-center">
    <h1 class="h1 mt-3">{name}</h1>
    <p class="p text-surface-400">{email}</p>
</div>