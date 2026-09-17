<script lang="ts">
	import AxisSlider from '$lib/components/axis-slider.svelte';
	import { formatDateTime, formatRelative } from '$lib/format';
	import { personalityAxes } from '$lib/axes';
	import { Switch } from '@skeletonlabs/skeleton-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const models = ['haiku', 'sonnet', 'nova-lite', 'nova-pro', 'mistral-large'];

	// Local edit buffer. Cancel restores it from the server-loaded bot, which is
	// why the draft is a plain copy rather than a binding onto `data`.
	function freshDraft() {
		return {
			name: data.bot.name,
			botName: data.bot.botName,
			companyName: data.bot.companyName,
			mainModel: data.bot.mainModel,
			lightModel: data.bot.lightModel,
			allowDebug: data.bot.allowDebug,
			maxTokens: data.bot.maxTokens,
			axes: { ...data.bot.axes }
		};
	}

	let draft = $state(freshDraft());
	let pending = $state(false);
	let saved = $state(false);

	// Static demo: nothing is written anywhere. The button exercises the
	// form's own state so the screen behaves as it would against an API.
	function save(event: SubmitEvent) {
		event.preventDefault();
		pending = true;

		setTimeout(() => {
			pending = false;
			saved = true;
		}, 300);
	}

	const dirty = $derived(JSON.stringify(draft) !== JSON.stringify(freshDraft()));
</script>

<svelte:head><title>{data.bot.name} - ConnectionCode</title></svelte:head>

<form onsubmit={save}>
	<header class="border-surface-200-800 bg-surface-100-900 border-b px-8 py-5">
		<!-- The breadcrumb now lives in the app layout, so it shows on every screen. -->
		<div class="flex flex-wrap items-center justify-between gap-4">
			<div>
				<h1 class="h2 font-bold">{draft.name || 'Untitled'}</h1>
				<p class="text-surface-600-400 font-mono text-xs">{data.bot.id}</p>
			</div>

			<div class="flex items-center gap-2">
				{#if dirty}
					<span class="badge preset-tonal-warning">Unsaved changes</span>
				{/if}
				<button
					type="button"
					class="btn preset-tonal-surface"
					disabled={!dirty || pending}
					onclick={() => (draft = freshDraft())}
				>
					Cancel
				</button>
				<button type="submit" class="btn preset-filled-primary-500" disabled={!dirty || pending}>
					{pending ? 'Saving...' : 'Save'}
				</button>
			</div>
		</div>
	</header>

	<div class="space-y-6 p-8">
		{#if saved}
			<div class="card preset-tonal-warning p-4 text-sm">
				<p class="font-semibold">Saved in the page only - this static demo writes nowhere.</p>
				<p class="mt-1 opacity-80">
					The data is a snapshot captured from the admin API, bundled with the build.
				</p>
			</div>
		{/if}

		<div class="grid gap-6 lg:grid-cols-3">
			<div class="space-y-6 lg:col-span-2">
				<section class="card preset-filled-surface-100-900 space-y-4 p-6">
					<h2 class="h4 font-semibold">Identity</h2>

					<label class="label">
						<span class="label-text">Context name</span>
						<input class="input" name="name" bind:value={draft.name} required />
					</label>

					<div class="grid gap-4 sm:grid-cols-2">
						<label class="label">
							<span class="label-text">Bot name</span>
							<input class="input" name="botName" bind:value={draft.botName} />
						</label>
						<label class="label">
							<span class="label-text">Company name</span>
							<input class="input" name="companyName" bind:value={draft.companyName} />
						</label>
					</div>
				</section>

				<section class="card preset-filled-surface-100-900 space-y-5 p-6">
					<div>
						<h2 class="h4 font-semibold">Personality</h2>
						<p class="text-surface-600-400 mt-1 text-sm">
							The five <code class="font-mono">&lt;axis&gt;Level</code> settings the guided setup
							writes, each on a 1-5 scale.
						</p>
					</div>

					{#each personalityAxes as axis (axis.key)}
						<AxisSlider
							name={axis.key}
							label={axis.label}
							low={axis.low}
							high={axis.high}
							bind:value={draft.axes[axis.key]}
						/>
					{/each}
				</section>

				<section class="card preset-filled-surface-100-900 space-y-4 p-6">
					<h2 class="h4 font-semibold">Models</h2>

					<div class="grid gap-4 sm:grid-cols-2">
						<label class="label">
							<span class="label-text">Main model</span>
							<select class="select" name="mainModel" bind:value={draft.mainModel}>
								{#each models as model (model)}
									<option value={model}>{model}</option>
								{/each}
							</select>
						</label>
						<label class="label">
							<span class="label-text">Light model</span>
							<select class="select" name="lightModel" bind:value={draft.lightModel}>
								{#each models as model (model)}
									<option value={model}>{model}</option>
								{/each}
							</select>
						</label>
					</div>

					<label class="label">
						<span class="label-text">
							Max tokens <span class="text-surface-600-400">({draft.maxTokens})</span>
						</span>
						<input
							class="input"
							type="range"
							name="maxTokens"
							min="512"
							max="16384"
							step="512"
							bind:value={draft.maxTokens}
						/>
					</label>

					<Switch
						name="allowDebug"
						checked={draft.allowDebug}
						onCheckedChange={(details) => (draft.allowDebug = details.checked)}
						class="flex items-center justify-between gap-4"
					>
						<Switch.Label class="text-sm font-medium">Allow debug output</Switch.Label>
						<Switch.Control
							class="bg-surface-300-700 data-[state=checked]:bg-primary-500 relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors"
						>
							<Switch.Thumb
								class="bg-surface-50-950 absolute top-1 left-1 size-4 rounded-full shadow transition-transform data-[state=checked]:translate-x-5"
							/>
							<Switch.HiddenInput />
						</Switch.Control>
					</Switch>
				</section>
			</div>

			<aside class="space-y-6">
				<section class="card preset-filled-surface-100-900 space-y-3 p-6">
					<h2 class="h4 font-semibold">Metadata</h2>

					<dl class="space-y-3 text-sm">
						<div class="flex justify-between gap-3">
							<dt class="text-surface-600-400">Created</dt>
							<dd class="text-right font-medium">{formatDateTime(data.bot.createdAt)}</dd>
						</div>
						<div class="flex justify-between gap-3">
							<dt class="text-surface-600-400">Modified</dt>
							<dd class="text-right font-medium" title={formatDateTime(data.bot.updatedAt)}>
								{formatRelative(data.bot.updatedAt)}
							</dd>
						</div>
						<div class="flex justify-between gap-3">
							<dt class="text-surface-600-400">Versions</dt>
							<dd class="font-medium">{data.bot.versionsCount}</dd>
						</div>
						<div class="flex justify-between gap-3">
							<dt class="text-surface-600-400">Default version</dt>
							<dd class="font-medium">{data.bot.defaultVersion ?? 'None'}</dd>
						</div>
					</dl>
				</section>

				<section class="card preset-filled-surface-100-900 space-y-3 p-6">
					<h2 class="h4 font-semibold">Topics</h2>
					{#if data.bot.topics.length}
						<ul class="space-y-2 text-sm">
							{#each data.bot.topics as topic (topic.key)}
								<li class="flex items-center justify-between gap-2">
									<span class="truncate font-mono text-xs">{topic.key}</span>
									<span class="flex shrink-0 gap-1">
										{#if topic.default}
											<span class="badge preset-tonal-success text-xs">default</span>
										{/if}
										<span class="badge preset-tonal-surface text-xs">{topic.model}</span>
									</span>
								</li>
							{/each}
						</ul>
					{:else}
						<p class="text-surface-600-400 text-sm">No topic configured.</p>
					{/if}
				</section>

				<section class="card preset-filled-surface-100-900 space-y-3 p-6">
					<h2 class="h4 font-semibold">Prompt modes</h2>
					{#if data.bot.promptModes.length}
						<div class="flex flex-wrap gap-1.5">
							{#each data.bot.promptModes as mode (mode)}
								<span class="badge preset-tonal-primary text-xs">{mode}</span>
							{/each}
						</div>
					{:else}
						<p class="text-surface-600-400 text-sm">No prompt configured.</p>
					{/if}
				</section>
			</aside>
		</div>
	</div>
</form>
