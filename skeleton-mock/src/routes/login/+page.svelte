<script lang="ts">
	import { session } from '$lib/session.svelte';

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let pending = $state(false);

	function submit(event: SubmitEvent) {
		event.preventDefault();

		if (!email.trim() || !password) {
			error = 'Enter both an email and a password.';
			return;
		}

		pending = true;
		session.signIn(email.trim());
	}
</script>

<svelte:head><title>Sign in - ConnectionCode</title></svelte:head>

<div class="grid min-h-screen lg:grid-cols-2">
	<!-- Brand panel. Skeleton's theme tokens (primary / surface) drive every colour. -->
	<aside class="preset-filled-primary-500 hidden flex-col justify-between p-12 lg:flex">
		<div class="flex items-center gap-3">
			<div
				class="preset-filled-surface-50-950 flex size-9 items-center justify-center rounded-lg font-bold"
			>
				C
			</div>
			<span class="text-lg font-semibold">ConnectionCode</span>
		</div>

		<div class="space-y-4">
			<h1 class="h1 font-bold">Conversation platform, supervised.</h1>
			<p class="max-w-md opacity-80">
				Bots, agent desk, reporting and live supervision in a single administration console.
			</p>
		</div>

		<p class="text-sm opacity-60">Skeleton mockup - throwaway</p>
	</aside>

	<main class="flex items-center justify-center p-6">
		<div class="w-full max-w-sm space-y-8">
			<header class="space-y-2">
				<h2 class="h2 font-bold">Sign in</h2>
				<p class="text-surface-600-400 text-sm">
					Any email and password will do - this mockup fakes the session.
				</p>
			</header>

			<form
				class="space-y-4"
				onsubmit={submit}
			>
				<label class="label">
					<span class="label-text">Email</span>
					<input
						class="input"
						type="email"
						name="email"
						placeholder="you@nixxis.com"
						bind:value={email}
						required
					/>
				</label>

				<label class="label">
					<span class="label-text">Password</span>
					<input class="input" type="password" name="password" placeholder="********" bind:value={password} required />
				</label>

				{#if error}
					<div class="card preset-tonal-error p-3 text-sm">{error}</div>
				{/if}

				<button type="submit" class="btn preset-filled-primary-500 w-full" disabled={pending}>
					{pending ? 'Signing in...' : 'Sign in'}
				</button>
			</form>

			<p class="text-surface-600-400 text-center text-xs">
				The real app uses hosted OAuth. This screen only sets a cookie.
			</p>
		</div>
	</main>
</div>
