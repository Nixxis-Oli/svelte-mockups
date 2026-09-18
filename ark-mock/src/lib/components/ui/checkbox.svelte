<script lang="ts">
	import { cn } from '$lib/utils';
	import { Checkbox } from '@ark-ui/svelte/checkbox';
	import Check from '@lucide/svelte/icons/check';

	// `onchange` is for the header checkbox, whose state is derived from the
	// selection rather than owned by it - binding would fight the derivation.
	type Props = {
		checked: boolean;
		label?: string;
		class?: string;
		onchange?: (checked: boolean) => void;
	};

	let { checked = $bindable(), label, class: className, onchange }: Props = $props();
</script>

<Checkbox.Root
	{checked}
	onCheckedChange={(details) => {
		checked = details.checked === true;
		onchange?.(checked);
	}}
	aria-label={label}
	class="inline-flex shrink-0"
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
	<Checkbox.HiddenInput />
</Checkbox.Root>
