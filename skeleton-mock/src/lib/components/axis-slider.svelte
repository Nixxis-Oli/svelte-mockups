<script lang="ts">
	import { Slider } from '@skeletonlabs/skeleton-svelte';

	// Skeleton's Slider is Zag behaviour plus data-part attributes - it ships no
	// styling of its own, so every class below is ours. Its HiddenInput does give
	// us free form submission under `name`.
	type Props = {
		name: string;
		label: string;
		low: string;
		high: string;
		value: number;
	};

	let { name, label, low, high, value = $bindable() }: Props = $props();
</script>

<Slider
	{name}
	value={[value]}
	min={1}
	max={5}
	step={1}
	onValueChange={(details) => (value = details.value[0])}
	class="space-y-2"
>
	<div class="flex items-baseline justify-between">
		<Slider.Label class="text-sm font-medium">{label}</Slider.Label>
		<span class="badge preset-tonal-primary text-xs">{value} / 5</span>
	</div>

	<Slider.Control class="relative flex h-5 w-full items-center">
		<Slider.Track class="bg-surface-300-700 h-1.5 w-full rounded-full">
			<Slider.Range class="bg-primary-500 h-full rounded-full" />
		</Slider.Track>
		<Slider.Thumb
			index={0}
			class="border-primary-500 bg-surface-50-950 size-4 cursor-grab rounded-full border-2 shadow focus:outline-2 focus:outline-offset-2 focus:outline-current active:cursor-grabbing"
		>
			<Slider.HiddenInput />
		</Slider.Thumb>
	</Slider.Control>

	<div class="text-surface-600-400 flex justify-between text-xs">
		<span>{low}</span>
		<span>{high}</span>
	</div>
</Slider>
