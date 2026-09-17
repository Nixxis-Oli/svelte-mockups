<script lang="ts">
	import { theme, themes, type ThemeName } from '$lib/theme.svelte';
</script>

<div class="space-y-2">
	<p class="text-surface-600-400 text-xs font-semibold tracking-wider uppercase">Theme</p>

	<div class="flex gap-2">
		<select
			class="select grow text-sm capitalize"
			value={theme.name}
			onchange={(event) => theme.setName(event.currentTarget.value as ThemeName)}
		>
			{#each themes as name (name)}
				<option value={name}>{name}</option>
			{/each}
		</select>

		<button
			type="button"
			class="btn-icon preset-tonal-surface"
			title="Toggle light / dark"
			aria-label="Toggle light / dark"
			onclick={() => theme.toggleMode()}
		>
			{theme.mode === 'dark' ? '☽' : '☀'}
		</button>
	</div>

	<p class="text-surface-600-400 text-xs">
		All 24 themes Skeleton ships. None is achromatic - hamlindigo comes closest.
	</p>
</div>
