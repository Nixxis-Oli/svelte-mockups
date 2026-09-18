<script lang="ts">
	import Badge from '$lib/components/ui/badge.svelte';
	import Label from '$lib/components/ui/label.svelte';
	import Slider from '$lib/components/ui/slider.svelte';
	import { cn } from '$lib/utils';
	import { ToggleGroup } from '@ark-ui/svelte/toggle-group';

	// Short scales read better as a segmented control than as a slider: three
	// positions on a track are hard to hit and hard to label. Anything longer
	// keeps the slider.
	type Props = {
		name: string;
		label: string;
		low: string;
		high: string;
		levels: number;
		wording: string;
		value: number;
	};

	let { name, label, low, high, levels, wording, value = $bindable() }: Props = $props();

	const useButtons = $derived(levels <= 3);

	// Zag hands values back as an array, and clears it when the pressed item is
	// clicked again - an axis must always hold a position, so empty is ignored.
	function choose(details: { value: string[] }) {
		const next = details.value[0];

		if (next) {
			value = Number(next);
		}
	}

	const steps = $derived(Array.from({ length: levels }, (_, index) => index + 1));
</script>

<div class="space-y-2">
	<div class="flex items-baseline justify-between gap-3">
		<Label for={name}>{label}</Label>
		<Badge variant="secondary">{value} / {levels}</Badge>
	</div>

	{#if useButtons}
		<ToggleGroup.Root
			value={[String(value)]}
			onValueChange={choose}
			class="border-input grid gap-1 rounded-md border p-1"
			style="grid-template-columns: repeat({levels}, minmax(0, 1fr))"
		>
			{#each steps as step (step)}
				<ToggleGroup.Item
					value={String(step)}
					aria-label="{label} level {step}"
					class={cn(
						'rounded-sm px-2 py-1.5 text-xs font-medium transition-colors',
						'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground',
						'data-[state=off]:hover:bg-accent data-[state=off]:hover:text-accent-foreground'
					)}
				>
					{step === 1 ? low : step === levels ? high : '·'}
				</ToggleGroup.Item>
			{/each}
		</ToggleGroup.Root>

		<!-- ToggleGroup has no HiddenInput in either library, unlike Ark's Slider. -->
		<input type="hidden" {name} {value} />
	{:else}
		<Slider bind:value {name} min={1} max={levels} step={1} />

		<div class="text-muted-foreground flex justify-between text-xs">
			<span>{low}</span>
			<span>{high}</span>
		</div>
	{/if}

	<p class="text-muted-foreground border-l-2 pl-3 text-xs italic">{wording}</p>
</div>
