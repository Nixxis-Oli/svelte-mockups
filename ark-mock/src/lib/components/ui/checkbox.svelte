<script lang="ts">
	import { cn } from '$lib/utils';
	import { Checkbox } from '@ark-ui/svelte/checkbox';
	import Check from '@lucide/svelte/icons/check';

	// `onchange` is for the header checkbox, whose state is derived from the
	// selection rather than owned by it - binding would fight the derivation.
	//
	// `presentational` is for the one inside a card: there the whole card is the
	// control, so the box must only show state. Ark renders Root as a <label>
	// wrapping a hidden <input>, so a click inside a card would fire twice - once
	// from the label and once from the input it forwards to.
	type Props = {
		checked: boolean;
		label?: string;
		class?: string;
		presentational?: boolean;
		onchange?: (checked: boolean) => void;
	};

	let {
		checked = $bindable(),
		label,
		class: className,
		presentational = false,
		onchange
	}: Props = $props();
</script>

<Checkbox.Root
	{checked}
	onCheckedChange={(details) => {
		checked = details.checked === true;
		onchange?.(checked);
	}}
	aria-label={presentational ? undefined : label}
	aria-hidden={presentational ? 'true' : undefined}
	class={cn('inline-flex shrink-0', presentational && 'pointer-events-none')}
>
	<Checkbox.Control
		class={cn(
			'border-input focus-visible:ring-ring data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground flex size-5 shrink-0 items-center justify-center rounded-[4px] border shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
			className
		)}
	>
		<Checkbox.Indicator>
			<Check class="size-3.5" />
		</Checkbox.Indicator>
	</Checkbox.Control>

	<!-- Omitted when presentational: no form participation, and no input to
		 forward a second click from. -->
	{#if !presentational}
		<Checkbox.HiddenInput />
	{/if}
</Checkbox.Root>
