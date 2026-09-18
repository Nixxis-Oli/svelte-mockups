<script lang="ts">
	import type { Snippet } from 'svelte';
	import AppSwitcher from './app-switcher.svelte';
	import UserMenu from './user-menu.svelte';
	import type { AppEntry, UserSummary } from '../types.js';

	// The right-hand end of a toolbar, and only that: the application owns the
	// rest of the bar. This renders an inline-flex cluster with no width, no
	// background and no border of its own, so it drops into whatever the host
	// already has.
	type Props = {
		apps: AppEntry[];
		user: UserSummary;
		currentAppId?: string;
		onSignOut?: () => void;
		/** Extra entries for the account menu. */
		menuItems?: Snippet;
		/** Anything the application wants between its own content and this cluster. */
		before?: Snippet;
		class?: string;
	};

	let {
		apps,
		user,
		currentAppId,
		onSignOut,
		menuItems,
		before,
		class: className = ''
	}: Props = $props();
</script>

<div class="flex items-center gap-1 {className}">
	{#if before}
		{@render before()}
	{/if}

	<AppSwitcher {apps} {currentAppId} />
	<UserMenu {user} {onSignOut} items={menuItems} />
</div>
