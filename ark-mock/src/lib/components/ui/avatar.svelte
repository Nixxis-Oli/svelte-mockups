<script lang="ts">
	import { cn } from '$lib/utils';
	import { Avatar } from '@ark-ui/svelte/avatar';

	// Ark UI is headless like bits-ui: behaviour only, looks are ours.
	type Props = { src?: string; fallback: string; class?: string };

	let { src, fallback, class: className }: Props = $props();
</script>

<Avatar.Root
	class={cn(
		'bg-secondary text-secondary-foreground relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-semibold',
		className
	)}
>
	<Avatar.Fallback>{fallback}</Avatar.Fallback>
	{#if src}
		<Avatar.Image {src} alt={fallback} class="size-full object-cover" />
	{/if}
</Avatar.Root>
