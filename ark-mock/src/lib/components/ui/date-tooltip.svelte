<script lang="ts">
	import { cn } from '$lib/utils';
	import { Portal } from '@ark-ui/svelte/portal';
	import { Tooltip } from '@ark-ui/svelte/tooltip';

	// The card is already an <a>, so the trigger must not be a button: nesting
	// interactive elements is invalid HTML. Ark's `asChild` snippet lets us render
	// a plain <span> and still receive the trigger's behaviour props.
	type Props = { label: string; detail: string; class?: string };

	let { label, detail, class: className }: Props = $props();
</script>

<Tooltip.Root openDelay={200} closeDelay={100}>
	<Tooltip.Trigger>
		{#snippet asChild(props)}
			<span
				{...props()}
				class={cn('cursor-default underline decoration-dotted underline-offset-4', className)}
			>
				{label}
			</span>
		{/snippet}
	</Tooltip.Trigger>

	<Portal>
		<Tooltip.Positioner class="z-50">
			<Tooltip.Content
				class="bg-foreground text-background rounded-md px-2.5 py-1.5 text-xs font-medium shadow-md"
			>
				<Tooltip.Arrow>
					<Tooltip.ArrowTip class="bg-foreground" />
				</Tooltip.Arrow>
				{detail}
			</Tooltip.Content>
		</Tooltip.Positioner>
	</Portal>
</Tooltip.Root>
