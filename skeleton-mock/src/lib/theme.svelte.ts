import { browser } from '$app/environment';

// Every theme Skeleton ships. Each one must also be @import-ed in app.css, or
// its [data-theme] rules are not in the stylesheet and switching does nothing.
export const themes = [
	'catppuccin',
	'cerberus',
	'concord',
	'crimson',
	'dracula',
	'fennec',
	'hamlindigo',
	'legacy',
	'mint',
	'modern',
	'mona',
	'nosh',
	'nouveau',
	'pine',
	'reign',
	'rocket',
	'rose',
	'rosepine',
	'sahara',
	'seafoam',
	'terminus',
	'vintage',
	'vox',
	'wintry'
] as const;

export type ThemeName = (typeof themes)[number];

// No Skeleton theme is achromatic. hamlindigo has the least colourful primary
// ramp (mean chroma 0.052), so it is the closest to the stock shadcn look.
const DEFAULT_THEME: ThemeName = 'hamlindigo';

const THEME_KEY = 'mock-theme';
const MODE_KEY = 'mock-mode';

function readStored<T extends string>(key: string, fallback: T, allowed: readonly T[]): T {
	if (!browser) {
		return fallback;
	}

	const stored = localStorage.getItem(key);

	return allowed.includes(stored as T) ? (stored as T) : fallback;
}

class ThemeState {
	name = $state<ThemeName>(readStored(THEME_KEY, DEFAULT_THEME, themes));
	mode = $state<'light' | 'dark'>(readStored(MODE_KEY, 'light', ['light', 'dark'] as const));

	setName(name: ThemeName) {
		this.name = name;
		this.apply();
	}

	toggleMode() {
		this.mode = this.mode === 'dark' ? 'light' : 'dark';
		this.apply();
	}

	// Skeleton reads the theme from an attribute, dark mode from the class.
	private apply() {
		if (!browser) {
			return;
		}

		document.documentElement.dataset.theme = this.name;
		document.documentElement.classList.toggle('dark', this.mode === 'dark');

		localStorage.setItem(THEME_KEY, this.name);
		localStorage.setItem(MODE_KEY, this.mode);
	}
}

export const theme = new ThemeState();
