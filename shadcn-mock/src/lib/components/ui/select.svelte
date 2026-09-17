<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	// A native select, styled. bits-ui does ship a full Select, but the shadcn
	// wrapper for it runs ~120 lines across four files - more than this mockup
	// needs to make its point.
	type Props = { class?: string; value?: string; children: Snippet } & HTMLSelectAttributes;

	let { class: className, value = $bindable(''), children, ...rest }: Props = $props();
</script>

<select
	bind:value
	class={cn(
		'border-input bg-background ring-offset-background focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...rest}
>
	{@render children()}
</select>
