<script lang="ts">
	import { cn } from '$lib/utils';
	import { Switch } from '@ark-ui/svelte/switch';

	type Props = { checked: boolean; name?: string; class?: string };

	let { checked = $bindable(), name, class: className }: Props = $props();
</script>

<Switch.Root
	{name}
	{checked}
	onCheckedChange={(details) => (checked = details.checked)}
	class={cn('inline-flex shrink-0 cursor-pointer items-center', className)}
>
	<Switch.Control
		class="focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=unchecked]:bg-secondary inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
	>
		<Switch.Thumb
			class="bg-background pointer-events-none block size-4 rounded-full shadow-lg transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
		/>
	</Switch.Control>
	<Switch.HiddenInput />
</Switch.Root>
