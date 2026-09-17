<script lang="ts">
	import { cn } from '$lib/utils';
	import { createListCollection } from '@ark-ui/svelte/collection';
	import { Portal } from '@ark-ui/svelte/portal';
	import { Select } from '@ark-ui/svelte/select';
	import Check from '@lucide/svelte/icons/check';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';

	// A real listbox, not a native <select>: Ark ships the whole anatomy, so the
	// shadcn mockup's fallback to a styled native element is not needed here.
	// HiddenSelect keeps plain form submission working under `name`.
	type Props = {
		value: string;
		options: string[];
		name?: string;
		id?: string;
		class?: string;
	};

	let { value = $bindable(), options, name, id, class: className }: Props = $props();

	const collection = $derived(createListCollection({ items: options }));
</script>

<Select.Root
	{id}
	{name}
	{collection}
	value={[value]}
	onValueChange={(details) => (value = details.value[0] ?? '')}
	positioning={{ sameWidth: true }}
	class={cn('w-full', className)}
>
	<Select.Control>
		<Select.Trigger
			class="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-9 w-full items-center justify-between rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
		>
			<Select.ValueText placeholder="Select..." />
			<Select.Indicator>
				<ChevronDown class="text-muted-foreground size-4" />
			</Select.Indicator>
		</Select.Trigger>
	</Select.Control>

	<Portal>
		<Select.Positioner class="z-50">
			<Select.Content
				class="bg-popover text-popover-foreground max-h-60 overflow-y-auto rounded-md border p-1 shadow-md focus:outline-none"
			>
				{#each collection.items as item (item)}
					<Select.Item
						{item}
						class="data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm select-none"
					>
						<Select.ItemText>{item}</Select.ItemText>
						<Select.ItemIndicator>
							<Check class="size-4" />
						</Select.ItemIndicator>
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Positioner>
	</Portal>

	<Select.HiddenSelect />
</Select.Root>
