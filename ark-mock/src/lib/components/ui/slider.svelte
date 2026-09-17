<script lang="ts">
	import { cn } from '$lib/utils';
	import { Slider } from '@ark-ui/svelte/slider';

	// Unlike bits-ui, Ark ships a HiddenInput, so `name` is enough to submit the
	// value with the form - no hand-written hidden field at the call site.
	type Props = {
		value: number;
		name?: string;
		min?: number;
		max?: number;
		step?: number;
		class?: string;
	};

	let {
		value = $bindable(),
		name,
		min = 1,
		max = 5,
		step = 1,
		class: className
	}: Props = $props();
</script>

<Slider.Root
	{name}
	{min}
	{max}
	{step}
	value={[value]}
	onValueChange={(details) => (value = details.value[0])}
	class={cn('w-full', className)}
>
	<Slider.Control class="relative flex h-5 w-full items-center">
		<Slider.Track class="bg-secondary h-1.5 w-full overflow-hidden rounded-full">
			<Slider.Range class="bg-primary h-full" />
		</Slider.Track>
		<Slider.Thumb
			index={0}
			class="border-primary bg-background ring-ring block size-4 cursor-grab rounded-full border-2 shadow transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:cursor-grabbing"
		>
			<Slider.HiddenInput />
		</Slider.Thumb>
	</Slider.Control>
</Slider.Root>
