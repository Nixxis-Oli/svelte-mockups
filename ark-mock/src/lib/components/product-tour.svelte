<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { Tour, useTour, type TourStepDetails } from '@ark-ui/svelte/tour';
	import CircleHelp from '@lucide/svelte/icons/circle-help';
	import X from '@lucide/svelte/icons/x';

	// The guided walkthrough neither Skeleton nor bits-ui offers: a spotlight over a
	// real element of the page, a backdrop over the rest, and next/prev controls.
	// Targets resolve lazily, so a step whose element is absent still shows.
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

<!-- The trigger ships with the tour rather than being wired from the page: no
	 bind:this, no component-instance typing to get right. -->
<Button variant="outline" size="sm" onclick={() => tour().start()}>
	<CircleHelp class="size-4" />
	Take the tour
</Button>

<Tour.Root {tour}>
	<Portal>
		<!-- Position and z-index come from Zag and from the tour rules in app.css;
			 only the paint is ours. -->
		<!-- backdrop-filter is clipped by the spotlight cut-out Zag draws with
			 clip-path, so the highlighted element stays sharp while everything
			 around it blurs. A lighter tint than a plain grey veil, since the
			 blur already separates foreground from background. -->
		<Tour.Backdrop class="bg-black/40 backdrop-blur-sm" />
		<Tour.Spotlight class="rounded-lg outline-2 outline-white/70" />

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
				class="bg-popover text-popover-foreground w-80 max-w-[calc(100vw-2rem)] space-y-3 rounded-lg border p-4 shadow-xl"
			>
				<Tour.Arrow>
					<Tour.ArrowTip class="border-t border-l" />
				</Tour.Arrow>

				<div class="flex items-start justify-between gap-3">
					<!-- No children: Title and Description render the current step's text. -->
					<Tour.Title class="font-semibold" />
					<Tour.CloseTrigger
						class="text-muted-foreground hover:text-foreground shrink-0 transition-colors"
						aria-label="Close tour"
					>
						<X class="size-4" />
					</Tour.CloseTrigger>
				</div>

				<Tour.Description class="text-muted-foreground text-sm" />

				<div class="flex items-center justify-between gap-3 border-t pt-3">
					<Tour.ProgressText class="text-muted-foreground text-xs" />

					<div class="flex gap-2">
						<Tour.Actions>
							{#snippet children(actions)}
								{#each actions() as action (action.label)}
									<Tour.ActionTrigger
										{action}
										class={action.action === 'prev'
											? 'border-input hover:bg-accent hover:text-accent-foreground inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium transition-colors'
											: 'bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-8 items-center rounded-md px-3 text-xs font-medium transition-colors'}
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
