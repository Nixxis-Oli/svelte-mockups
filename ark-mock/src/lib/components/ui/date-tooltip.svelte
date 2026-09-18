<script lang="ts">
	import { Portal } from '@ark-ui/svelte/portal';
	import { Tooltip } from '@ark-ui/svelte/tooltip';

	// The card is already an <a>, so the trigger must not be a button: nesting
	// interactive elements is invalid HTML. Ark's `asChild` snippet lets us render
	// a plain <span> and still receive the trigger's behaviour props.
	//
	// The span carries no styling of its own on purpose. An underline would make
	// it look like a control, and any cursor rule would override the pointer the
	// surrounding card link already shows.
	type Props = { label: string; detail: string; class?: string };

	let { label, detail, class: className }: Props = $props();
</script>

<Tooltip.Root openDelay={200} closeDelay={100}>
	<Tooltip.Trigger>
		{#snippet asChild(props)}
			<span {...props()} class={className}>{label}</span>
		{/snippet}
	</Tooltip.Trigger>

	<Portal>
		<Tooltip.Positioner class="z-50">
			<!-- Zag paints the tip from --arrow-background and sizes it from
				 --arrow-size, both applied inline; a Tailwind background class on the
				 tip loses to them, so the variables are what to set. -->
			<Tooltip.Content
				style="--arrow-size: 10px; --arrow-background: var(--foreground)"
				class="bg-foreground text-background rounded-md px-2.5 py-1.5 text-xs font-medium shadow-md"
			>
				<Tooltip.Arrow>
					<Tooltip.ArrowTip />
				</Tooltip.Arrow>
				{detail}
			</Tooltip.Content>
		</Tooltip.Positioner>
	</Portal>
</Tooltip.Root>
