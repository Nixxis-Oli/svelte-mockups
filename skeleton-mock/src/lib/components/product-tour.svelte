<script lang="ts">
	import { Portal } from '@ark-ui/svelte/portal';
	import { Tour, useTour, type TourStepDetails } from '@ark-ui/svelte/tour';
	import CircleHelp from '@lucide/svelte/icons/circle-help';
	import X from '@lucide/svelte/icons/x';

	// Skeleton has no tour component, so Ark supplies one. Both already run on
	// Zag.js, so this shares the engine rather than adding a second one - the
	// install deduped to a single set of @zag-js packages.
	//
	// Everything below is painted with Skeleton's own utility classes, so the
	// tour follows whichever of the 24 themes is active.
	const steps: TourStepDetails[] = [
		{
			id: 'welcome',
			type: 'dialog',
			title: 'Welcome to ConnectionCode',
			description: 'A short tour of the chat bots screen. Two minutes, no more.',
			actions: [{ label: 'Start', action: 'next' }]
		},
		{
			id: 'sidebar',
			type: 'tooltip',
			placement: 'right',
			target: () => document.querySelector('[data-tour="sidebar"]'),
			title: 'Navigation',
			description: 'Every section lives here. Ctrl+B hides the panel when you need room.',
			actions: [
				{ label: 'Back', action: 'prev' },
				{ label: 'Next', action: 'next' }
			]
		},
		{
			id: 'filter',
			type: 'tooltip',
			placement: 'bottom',
			target: () => document.querySelector('[data-tour="filter"]'),
			title: 'Find a bot',
			description: 'Filters on name, description and bot name as you type.',
			actions: [
				{ label: 'Back', action: 'prev' },
				{ label: 'Next', action: 'next' }
			]
		},
		{
			id: 'card',
			type: 'tooltip',
			placement: 'bottom',
			target: () => document.querySelector('[data-tour="first-card"]'),
			title: 'Open a bot',
			description: 'Each card opens the edit screen: identity, personality, models.',
			actions: [
				{ label: 'Back', action: 'prev' },
				{ label: 'Done', action: 'dismiss' }
			]
		}
	];

	const tour = useTour(() => ({ steps }));
</script>

<button type="button" class="btn preset-tonal-surface text-sm" onclick={() => tour().start()}>
	<CircleHelp class="size-4" />
	Take the tour
</button>

<Tour.Root {tour}>
	<Portal>
		<!-- Position and z-index come from Zag and from the tour rules in app.css;
			 only the paint is ours. -->
		<Tour.Backdrop class="bg-surface-950/50" />
		<Tour.Spotlight class="outline-surface-50/70 rounded-lg outline-2" />

		<!--
			Zag only injects positioning styles for `tooltip` steps (isTooltipStep).
			A `dialog` step gets none, so without the rules below it lands in normal
			document flow at the end of the portal - off screen, with a scrollbar.
			Inline styles win, so these classes never fight the tooltip positioning.
		-->
		<Tour.Positioner
			class="data-[type=dialog]:fixed data-[type=dialog]:inset-0 data-[type=dialog]:z-[calc(var(--tour-layer)+var(--tour-z-index))] data-[type=dialog]:flex data-[type=dialog]:items-center data-[type=dialog]:justify-center data-[type=dialog]:p-4"
		>
			<Tour.Content
				class="card preset-filled-surface-100-900 w-80 max-w-[calc(100vw-2rem)] space-y-3 p-4 shadow-xl"
			>
				<Tour.Arrow>
					<Tour.ArrowTip class="border-surface-200-800 border-t border-l" />
				</Tour.Arrow>

				<div class="flex items-start justify-between gap-3">
					<!-- No children: Title and Description render the current step's text. -->
					<Tour.Title class="font-semibold" />
					<Tour.CloseTrigger
						class="text-surface-600-400 hover:text-surface-950-50 shrink-0 transition-colors"
						aria-label="Close tour"
					>
						<X class="size-4" />
					</Tour.CloseTrigger>
				</div>

				<Tour.Description class="text-surface-700-300 text-sm" />

				<div class="border-surface-200-800 flex items-center justify-between gap-3 border-t pt-3">
					<Tour.ProgressText class="text-surface-600-400 text-xs" />

					<div class="flex gap-2">
						<Tour.Actions>
							{#snippet children(actions)}
								{#each actions() as action (action.label)}
									<Tour.ActionTrigger
										{action}
										class="btn btn-sm text-xs {action.action === 'prev'
											? 'preset-tonal-surface'
											: 'preset-filled-primary-500'}"
									/>
								{/each}
							{/snippet}
						</Tour.Actions>
					</div>
				</div>
			</Tour.Content>
		</Tour.Positioner>
	</Portal>
</Tour.Root>
