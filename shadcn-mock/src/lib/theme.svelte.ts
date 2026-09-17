import { browser } from '$app/environment';

// Palettes defined in app.css. Adding one here means writing one there too.
export const palettes = ['neutral', 'blue', 'violet', 'emerald', 'amber'] as const;

export type PaletteName = (typeof palettes)[number];

const PALETTE_KEY = 'mock-palette';
const MODE_KEY = 'mock-mode';

function readStored<T extends string>(key: string, fallback: T, allowed: readonly T[]): T {
	if (!browser) {
		return fallback;
	}

	const stored = localStorage.getItem(key);

	return allowed.includes(stored as T) ? (stored as T) : fallback;
}

class ThemeState {
	name = $state<PaletteName>(readStored(PALETTE_KEY, 'neutral', palettes));
	mode = $state<'light' | 'dark'>(readStored(MODE_KEY, 'light', ['light', 'dark'] as const));

	setName(name: PaletteName) {
		this.name = name;
		this.apply();
	}

	toggleMode() {
		this.mode = this.mode === 'dark' ? 'light' : 'dark';
		this.apply();
	}

	// Our own convention: an attribute for the palette, a class for the mode.
	private apply() {
		if (!browser) {
			return;
		}

		document.documentElement.dataset.palette = this.name;
		document.documentElement.classList.toggle('dark', this.mode === 'dark');

		localStorage.setItem(PALETTE_KEY, this.name);
		localStorage.setItem(MODE_KEY, this.mode);
	}
}

export const theme = new ThemeState();
