<script lang="ts">
	import { cn } from '$lib/utils';
	import { Tooltip } from 'bits-ui';

	// The card is already an <a>, so the trigger must not be a button: nesting
	// interactive elements is invalid HTML. bits-ui's `child` snippet lets us
	// render a plain <span> and still receive the trigger's behaviour props.
	type Props = { label: string; detail: string; class?: string };

	let { label, detail, class: className }: Props = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root delayDuration={200}>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<span {...props} class={cn('cursor-default underline decoration-dotted underline-offset-4', className)}>
					{label}
				</span>
			{/snippet}
		</Tooltip.Trigger>

		<Tooltip.Portal>
			<Tooltip.Content
				sideOffset={6}
				class="bg-foreground text-background z-50 rounded-md px-2.5 py-1.5 text-xs font-medium shadow-md"
			>
				<Tooltip.Arrow class="bg-foreground size-2 rotate-45 rounded-[2px]" />
				{detail}
			</Tooltip.Content>
		</Tooltip.Portal>
	</Tooltip.Root>
</Tooltip.Provider>
