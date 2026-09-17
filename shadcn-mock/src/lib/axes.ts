// The five personality axes the guided setup writes as `<axis>Level` settings,
// each on a 1-5 scale. Mirrors Client/src/app/mock-api/apps/admin-catalog/data.ts.
//
// Deliberately NOT in lib/server: the edit form needs these labels in the
// browser, and lib/server modules cannot be imported from a component.
export const personalityAxes = [
	{ key: 'warmthLevel', label: 'Warmth', low: 'Neutral', high: 'Warm' },
	{ key: 'verbosityLevel', label: 'Level of detail', low: 'Terse', high: 'Detailed' },
	{ key: 'initiativeLevel', label: 'Initiative', low: 'Reactive', high: 'Proactive' },
	{ key: 'addressLevel', label: 'Form of address', low: 'Informal', high: 'Formal' },
	{ key: 'expertiseLevel', label: 'Assumed expertise', low: 'Novice', high: 'Expert' }
] as const;

export type AxisKey = (typeof personalityAxes)[number]['key'];
