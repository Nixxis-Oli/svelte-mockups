<script lang="ts">
	import Button, { buttonVariants } from '$lib/components/ui/button.svelte';
	import { Dialog } from '@ark-ui/svelte/dialog';
	import { Portal } from '@ark-ui/svelte/portal';

	// Ark has no dedicated AlertDialog, unlike bits-ui: the same Dialog carries
	// role="alertdialog" instead. Same semantics, one prop rather than a separate
	// component.
	type Props = {
		open: boolean;
		title: string;
		description: string;
		confirmLabel?: string;
		onconfirm: () => void;
	};

	let {
		open = $bindable(),
		title,
		description,
		confirmLabel = 'Confirm',
		onconfirm
	}: Props = $props();
</script>

<Dialog.Root
	role="alertdialog"
	{open}
	onOpenChange={(details) => (open = details.open)}
>
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-50 bg-black/50" />
		<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center p-4">
			<Dialog.Content
				class="bg-popover text-popover-foreground w-full max-w-md space-y-4 rounded-lg border p-6 shadow-xl"
			>
				<div class="space-y-1.5">
					<Dialog.Title class="text-lg font-semibold">{title}</Dialog.Title>
					<Dialog.Description class="text-muted-foreground text-sm">
						{description}
					</Dialog.Description>
				</div>

				<div class="flex justify-end gap-2">
					<Dialog.CloseTrigger class={buttonVariants({ variant: 'outline' })}>
						Cancel
					</Dialog.CloseTrigger>
					<Button variant="destructive" onclick={onconfirm}>{confirmLabel}</Button>
				</div>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog.Root>
