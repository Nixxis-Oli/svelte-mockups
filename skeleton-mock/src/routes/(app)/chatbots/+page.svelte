<script lang="ts">
	import { base } from '$app/paths';
	import ProductTour from '$lib/components/product-tour.svelte';
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

<header class="border-surface-200-800 bg-surface-100-900 border-b px-8 py-6">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<h1 class="h2 font-bold">Chat bots</h1>
			<p class="text-surface-600-400 mt-1 text-sm">
				Read-only view of the contexts served by the admin API.
			</p>
		</div>

		<div class="flex items-center gap-3">
			<ProductTour />
			<span class="badge preset-tonal-surface">{data.chatbots.length} contexts</span>
			<div data-tour="filter">
				<input
					class="input w-56"
					type="search"
					placeholder="Filter bots..."
					bind:value={query}
				/>
			</div>
		</div>
	</div>
</header>

<div class="p-8">
	{#if data.error}
		<div class="card preset-tonal-error p-4">
			<p class="font-semibold">The admin API could not be reached.</p>
			<p class="mt-1 text-sm opacity-80">{data.error}</p>
		</div>
	{:else if filtered.length === 0}
		<div class="card preset-tonal-surface p-10 text-center">
			<p class="font-semibold">No bot matches "{query}"</p>
			<p class="text-surface-600-400 mt-1 text-sm">Clear the filter to see every context.</p>
		</div>
	{:else}
		<div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
			{#each filtered as bot, index (bot.id)}
				<a
					data-tour={index === 0 ? 'first-card' : undefined}
					href="{base}/chatbots/{bot.id}"
					class="card preset-filled-surface-100-900 hover:preset-filled-surface-200-800 flex flex-col gap-4 p-5 transition-colors"
				>
					<div class="flex items-start justify-between gap-3">
						<div class="min-w-0">
							<h2 class="truncate text-lg font-semibold">{bot.name || 'Untitled'}</h2>
							<p class="text-surface-600-400 font-mono text-xs">{bot.id}</p>
						</div>
						<span
							class="badge shrink-0 {bot.published
								? 'preset-filled-success-500'
								: 'preset-tonal-surface'}"
						>
							{bot.published ? 'Published' : 'Draft'}
						</span>
					</div>

					<p class="text-surface-700-300 min-h-10 text-sm">{bot.description}</p>

					{#if bot.models.length}
						<div class="flex flex-wrap gap-1.5">
							{#each bot.models as model (model)}
								<span class="badge preset-tonal-primary text-xs">{model}</span>
							{/each}
						</div>
					{/if}

					<dl class="border-surface-200-800 grid grid-cols-2 gap-3 border-t pt-4 text-xs">
						<div>
							<dt class="text-surface-600-400">Created</dt>
							<dd class="mt-0.5 font-medium" title={formatDateTime(bot.createdAt)}>
								{formatDate(bot.createdAt)}
							</dd>
						</div>
						<div>
							<dt class="text-surface-600-400">Modified</dt>
							<dd class="mt-0.5 font-medium" title={formatDateTime(bot.updatedAt)}>
								{formatRelative(bot.updatedAt)}
							</dd>
						</div>
					</dl>

					<div class="text-surface-600-400 flex gap-4 text-xs">
						<span>{bot.topicsCount} topics</span>
						<span>{bot.promptModes.length} prompts</span>
						<span>{bot.versionsCount} versions</span>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
