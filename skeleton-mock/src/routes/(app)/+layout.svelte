<script lang="ts">
	import { base } from '$app/paths';
	import { introHref } from '$lib/paths';
	import { page } from '$app/state';
	import { buildBreadcrumbs } from '$lib/breadcrumbs';
	import ThemeSwitcher from '$lib/components/theme-switcher.svelte';
	import { navSections } from '$lib/nav';
	import { session } from '$lib/session.svelte';
	import { createSidebar, MAX_WIDTH, MIN_WIDTH } from '$lib/sidebar.svelte';
	import { Avatar } from '@skeletonlabs/skeleton-svelte';
	import PanelLeft from '@lucide/svelte/icons/panel-left';
	// Skeleton 5 components are Zag-based and compound: Avatar.Root / Avatar.Fallback.
	// They carry behaviour, not looks - the visuals still come from Tailwind classes.

	import { goto } from '$app/navigation';

	let { children }: { children: any } = $props();

	const initials = $derived((session.user ?? '?').slice(0, 2).toUpperCase());
	const crumbs = $derived(buildBreadcrumbs(page.url.pathname, page.data));

	const sidebar = createSidebar();

	// The pre-paint script in app.html sets --sidebar-width on :root; this
	// keeps it in step while the handle is dragged.
	$effect(() => {
		document.documentElement.style.setProperty('--sidebar-width', `${sidebar.width}px`);
	});

	// No server to gate the route in a prerendered build, so the guard runs
	// in the browser. It protects nothing real - the session is fake.
	$effect(() => {
		if (!session.user) {
			goto(`${base}/login`);
		}
	});
</script>

<svelte:window onkeydown={(event) => sidebar.handleShortcut(event)} />

<!--
	Offcanvas collapse, the way shadcn's own Sidebar does it: two cooperating
	layers rather than one shrinking element.

	1. A spacer in normal flow that animates its width to 0. This is what makes
	   the main content reflow smoothly instead of jumping.
	2. A fixed panel that slides to left:-{width}. Because it is fixed and keeps
	   its width throughout, its contents never reflow while animating - which is
	   what makes the motion look clean rather than squashed.

	Both run transition-[left,width] duration-200 ease-linear, so they stay in step.
-->
<div class="bg-surface-50-950 flex min-h-screen w-full">
	<div
		class="relative hidden shrink-0 bg-transparent md:block
			{sidebar.dragging ? '' : 'transition-[width] duration-200 ease-linear'}
			{sidebar.collapsed ? 'w-0' : 'w-(--sidebar-width)'}"
	></div>

	<aside
		data-tour="sidebar"
		data-state={sidebar.collapsed ? 'collapsed' : 'expanded'}
		class="border-surface-200-800 bg-surface-100-900 fixed inset-y-0 z-20 hidden h-svh w-(--sidebar-width) flex-col border-r md:flex
			{sidebar.dragging ? '' : 'transition-[left] duration-200 ease-linear'}
			{sidebar.collapsed ? 'left-[calc(var(--sidebar-width)*-1)]' : 'left-0'}"
	>
		<a
			href={introHref}
			title="Back to the mockup index"
			class="border-surface-200-800 hover:preset-tonal-surface flex h-[4.25rem] shrink-0 items-center gap-3 border-b px-5 transition-colors"
		>
			<div
				class="preset-filled-primary-500 flex size-9 shrink-0 items-center justify-center rounded-lg font-bold"
			>
				C
			</div>
			<div class="min-w-0">
				<p class="truncate font-semibold">ConnectionCode</p>
				<p class="text-surface-600-400 text-xs">Administration</p>
			</div>
		</a>

		<nav class="flex-1 space-y-6 overflow-y-auto p-4">
			{#each navSections as section (section.title)}
				<div class="space-y-1">
					<p class="text-surface-600-400 px-3 text-xs font-semibold tracking-wider uppercase">
						{section.title}
					</p>

					{#each section.items as item (item.href)}
						{@const active = page.url.pathname.startsWith(`${base}${item.href}`)}
						<a
							href="{base}{item.href}"
							class="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors
								{active ? 'preset-filled-primary-500' : 'hover:preset-tonal-surface'}"
						>
							<span class="flex min-w-0 items-center gap-3">
								<item.icon class="size-4 shrink-0" />
								<span class="truncate">{item.label}</span>
							</span>
							{#if !item.ready}
								<span class="badge preset-tonal-surface shrink-0 text-[10px]">soon</span>
							{/if}
						</a>
					{/each}
				</div>
			{/each}
		</nav>

		<div class="border-surface-200-800 shrink-0 space-y-4 border-t p-4">
			<ThemeSwitcher />

			<div class="flex items-center gap-3">
				<Avatar
					class="preset-filled-secondary-500 flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
				>
					<Avatar.Fallback>{initials}</Avatar.Fallback>
				</Avatar>
				<div class="min-w-0 flex-1">
					<p class="truncate text-sm font-medium">{session.user}</p>
					<p class="text-surface-600-400 text-xs">Administrator</p>
				</div>
			</div>

				<button type="submit" class="btn preset-tonal-surface w-full text-sm"
					onclick={() => session.signOut()}
				>Sign out</button>
		</div>

		<!-- Resize handle: a hairline with a wider hit area, draggable, focusable
			 and double-clickable to restore the default width. -->
		<!-- WAI-ARIA's window-splitter pattern: a focusable separator carrying
			 aria-valuenow IS a widget. Svelte's a11y lint treats `separator` as
			 always non-interactive and rejects it on a button, so the rule is
			 silenced here rather than the semantics being made wrong. -->
		<!-- svelte-ignore a11y_no_interactive_element_to_noninteractive_role -->
		<button
			type="button"
			role="separator"
			aria-label="Resize sidebar"
			aria-orientation="vertical"
			aria-valuenow={sidebar.width}
			aria-valuemin={MIN_WIDTH}
			aria-valuemax={MAX_WIDTH}
			tabindex="0"
			onpointerdown={(event) => sidebar.startResize(event)}
			onkeydown={(event) => sidebar.handleResizeKey(event)}
			ondblclick={() => sidebar.resetWidth()}
			class="group absolute inset-y-0 -right-1 z-10 w-2 cursor-col-resize touch-none focus:outline-none"
		>
			<span
				class="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 transition-colors group-hover:bg-primary-500 group-focus-visible:bg-primary-500
					{sidebar.dragging ? 'bg-primary-500' : 'bg-surface-300-700'}"
			></span>
		</button>
	</aside>

	<div class="flex min-w-0 flex-1 flex-col">
		<!-- Sticky so the trail, and the only way back to a hidden sidebar, stay on screen. -->
		<div
			class="border-surface-200-800 bg-surface-100-900/90 sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3 backdrop-blur md:px-8"
		>
			<button
				type="button"
				class="btn-icon preset-tonal-surface -ms-1 shrink-0"
				onclick={() => sidebar.toggle()}
				title="Toggle sidebar (Ctrl+B)"
				aria-label="Toggle sidebar"
				aria-expanded={!sidebar.collapsed}
			>
				<PanelLeft class="size-4" />
			</button>

			<div class="border-surface-200-800 h-5 border-l"></div>

			<nav aria-label="Breadcrumb" class="min-w-0">
				<ol class="text-surface-600-400 flex flex-wrap items-center gap-2 text-sm">
					{#each crumbs as crumb, index (crumb.href)}
						{#if index > 0}
							<li aria-hidden="true">/</li>
						{/if}
						<li>
							{#if index === crumbs.length - 1}
								<span class="text-surface-950-50 font-medium" aria-current="page">
									{crumb.label}
								</span>
							{:else}
								<a class="anchor" href={crumb.href}>{crumb.label}</a>
							{/if}
						</li>
					{/each}
				</ol>
			</nav>
		</div>

		{@render children()}
	</div>
</div>
