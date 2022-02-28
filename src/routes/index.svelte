<script lang="ts">
	import { onMount } from 'svelte';
	import { services, Url } from '../lib/url';

	let time = new Date();
	let query = '';
	let match: Url | undefined;

	const autofocus = (node: HTMLInputElement) => node.focus();
	const keyListener = async (e: KeyboardEvent) => {
		if (e.key === 'Escape') query = ''; // quick delete query
	};
	const initialKeyDown = (e: KeyboardEvent) => {
		if (/^[a-zA-Z.,\/#!$%\^&\*;:{}=\-_`~() ]$/.test(e.key)) {
			e.preventDefault();
			query = e.key;
		}
	};

	onMount(() => {
		const interval = setInterval(() => (time = new Date()), 1000);
		document.addEventListener('keydown', initialKeyDown);

		return () => {
			clearInterval(interval);
			document.removeEventListener('keydown', initialKeyDown);
		};
	});

	const addZero = (time: number) => (time >= 10 ? '' + time : '0' + time);

	$: hours = addZero(time.getHours());
	$: minutes = addZero(time.getMinutes());
	$: seconds = addZero(time.getSeconds());
	$: {
		if (typeof document !== 'undefined') {
			query === ''
				? document.addEventListener('keydown', initialKeyDown)
				: document.removeEventListener('keydown', initialKeyDown);
		}
	}

	const extractShortName = (str: string) => (str.includes("'") ? str.split("'")[0] : str);

	$: {
		if (typeof document !== 'undefined') {
			match = services.findByShortName(extractShortName(query));
			if (match) document.body.style.backgroundColor = match.color;
			else document.body.style.backgroundColor = '#222';
		}
	}

	const openInTab = (url: string) => window.open(url, '_blank');

	const onSubmit = () => {
		const q = query.trim().toLowerCase();
		// simple open with one letter
		const found = services.findByShortName(q);
		if (found) {
			openInTab(found.homepage);
			query = '';
		}

		// search in a service
		if (/^[a-z]+!.*/.test(q)) {
			const [service, searchQuery] = q.split('!');
			const found = services.findByShortName(service);
			if (found) {
				openInTab(found.searchLink(searchQuery));
				query = '';
			}
		}
	};
</script>

<svelte:head>
	<title>Homepage</title>
</svelte:head>

{#if query === ''}
	<div>
		<p class="text-7xl text-center">
			<span>{hours} : </span>
			<span>{minutes} : </span>
			<span>{seconds}</span>
		</p>
		<p class="text-center mt-5">Just start typing...</p>
	</div>
{:else}
	<form on:submit|preventDefault={onSubmit}>
		<input
			class="mx-auto text-8xl bg-transparent text-center focus:outline-none p-10"
			bind:value={query}
			use:autofocus
			type="search"
			on:keydown={keyListener}
		/>
		{#if match}
			<p class="text-3xl text-center">{match.name}</p>
		{/if}
	</form>
{/if}
