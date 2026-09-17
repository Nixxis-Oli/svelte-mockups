<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import { palettes, theme, type PaletteName } from '$lib/theme.svelte';
	import { cn } from '$lib/utils';

	// Swatch colours repeat the light --primary of each palette in app.css: a
	// palette's tokens only resolve while it is the active one, so the picker
	// cannot read them. Duplication we own - and have to keep in sync.
	const swatches: Record<PaletteName, string> = {
		neutral: 'oklch(0.205 0 0)',
		blue: 'oklch(0.52 0.19 263)',
		violet: 'oklch(0.54 0.23 295)',
		emerald: 'oklch(0.55 0.13 165)',
		amber: 'oklch(0.63 0.16 60)'
	};
</script>

<div class="space-y-2">
	<p class="text-muted-foreground text-xs font-semibold tracking-wider uppercase">Palette</p>

	<div class="flex flex-wrap items-center gap-2">
		<div class="flex min-w-0 grow flex-wrap gap-1.5">
			{#each palettes as name (name)}
				<button
					type="button"
					title={name}
					aria-label={name}
					aria-pressed={theme.name === name}
					onclick={() => theme.setName(name)}
					class={cn(
						'size-7 shrink-0 rounded-full border-2 transition-transform',
						theme.name === name
							? 'border-foreground scale-110'
							: 'border-transparent hover:scale-105'
					)}
					style="background: {swatches[name]}"
				></button>
			{/each}
		</div>

		<Button
			variant="outline"
			size="icon"
			class="size-8 shrink-0"
			title="Toggle light / dark"
			aria-label="Toggle light / dark"
			onclick={() => theme.toggleMode()}
		>
			{theme.mode === 'dark' ? '☽' : '☀'}
		</Button>
	</div>

	<p class="text-muted-foreground text-xs">
		5 palettes, each written by hand in <code class="font-mono">app.css</code>.
	</p>
</div>
