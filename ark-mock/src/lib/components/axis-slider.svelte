<script lang="ts">
	import Badge from '$lib/components/ui/badge.svelte';
	import Label from '$lib/components/ui/label.svelte';
	import Slider from '$lib/components/ui/slider.svelte';

	type Props = {
		name: string;
		label: string;
		low: string;
		high: string;
		value: number;
	};

	let { name, label, low, high, value = $bindable() }: Props = $props();
</script>

<div class="space-y-2">
	<div class="flex items-baseline justify-between">
		<Label for={name}>{label}</Label>
		<Badge variant="secondary">{value} / 5</Badge>
	</div>

	<!-- No hand-written hidden input here: Ark's Slider.HiddenInput covers it. -->
	<Slider bind:value {name} min={1} max={5} step={1} />

	<div class="text-muted-foreground flex justify-between text-xs">
		<span>{low}</span>
		<span>{high}</span>
	</div>
</div>
