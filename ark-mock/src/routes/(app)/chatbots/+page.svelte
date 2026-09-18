<script lang="ts">
	import { base } from '$app/paths';
	import ProductTour from '$lib/components/product-tour.svelte';
	import Badge from '$lib/components/ui/badge.svelte';
	import Card from '$lib/components/ui/card.svelte';
	import DateTooltip from '$lib/components/ui/date-tooltip.svelte';
	import Input from '$lib/components/ui/input.svelte';
	import { formatDate, formatDateTime, formatRelative } from '$lib/format';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let query = $state('');

	const filtered = $derived(
		data.chatbots.filter((bot) => {
			const needle = query.trim().toLowerCase();
			if (!needle) return true;
			return (
				bot.name.toLowerCase().includes(needle) ||
				bot.description.toLowerCase().includes(needle) ||
				bot.botName.toLowerCase().includes(needle)
			);
		})
	);
</script>

<svelte:head><title>Chat bots - ConnectionCode</title></svelte:head>

<header class="bg-card border-b px-8 py-6">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<h1 class="text-2xl font-semibold tracking-tight">Chat bots</h1>
			<p class="text-muted-foreground mt-1 text-sm">
				Read-only view of the contexts served by the admin API.
			</p>
		</div>

		<div class="flex items-center gap-3">
			<ProductTour />
			<Badge variant="muted">{data.chatbots.length} contexts</Badge>
			<div data-tour="filter">
				<Input class="w-56" type="search" placeholder="Filter bots..." bind:value={query} />
			</div>
		</div>
	</div>
</header>

<div class="p-8">
	{#if data.error}
		<Card class="border-destructive/40 bg-destructive/5 p-4">
			<p class="text-destructive font-semibold">The admin API could not be reached.</p>
			<p class="text-muted-foreground mt-1 text-sm">{data.error}</p>
		</Card>
	{:else if filtered.length === 0}
		<Card class="p-10 text-center">
			<p class="font-semibold">No bot matches "{query}"</p>
			<p class="text-muted-foreground mt-1 text-sm">Clear the filter to see every context.</p>
		</Card>
	{:else}
		<div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
			{#each filtered as bot, index (bot.id)}
				<a
					href="{base}/chatbots/{bot.id}"
					class="block"
					data-tour={index === 0 ? 'first-card' : undefined}
				>
					<Card class="hover:border-primary/40 flex h-full flex-col gap-4 p-5 transition-colors">
					<div class="flex items-start justify-between gap-3">
						<div class="min-w-0">
							<h2 class="truncate text-lg font-semibold">{bot.name || 'Untitled'}</h2>
							<p class="text-muted-foreground font-mono text-xs">{bot.id}</p>
						</div>
						<Badge variant={bot.published ? 'success' : 'muted'}>
							{bot.published ? 'Published' : 'Draft'}
						</Badge>
					</div>

					<p class="text-muted-foreground min-h-10 text-sm">{bot.description}</p>

					{#if bot.models.length}
						<div class="flex flex-wrap gap-1.5">
							{#each bot.models as model (model)}
								<Badge variant="outline">{model}</Badge>
							{/each}
						</div>
					{/if}

					<dl class="grid grid-cols-2 gap-3 border-t pt-4 text-xs">
						<div>
							<dt class="text-muted-foreground">Created</dt>
							<dd class="mt-0.5 font-medium">
								<DateTooltip
									label={formatDate(bot.createdAt)}
									detail={formatDateTime(bot.createdAt)}
								/>
							</dd>
						</div>
						<div>
							<dt class="text-muted-foreground">Modified</dt>
							<dd class="mt-0.5 font-medium">
								<DateTooltip
									label={formatRelative(bot.updatedAt)}
									detail={formatDateTime(bot.updatedAt)}
								/>
							</dd>
						</div>
					</dl>

					<div class="text-muted-foreground flex gap-4 text-xs">
						<span>{bot.topicsCount} topics</span>
						<span>{bot.promptModes.length} prompts</span>
						<span>{bot.versionsCount} versions</span>
					</div>
				</Card>
					</a>
			{/each}
		</div>
	{/if}
</div>
