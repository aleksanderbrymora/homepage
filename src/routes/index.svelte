<script lang="ts">
	import { searchDict } from '../lib/search';
	import qs from 'qs';
	import { onMount } from 'svelte';

	let time = new Date();
	let query = '';

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

	$: console.log({ query });
	$: {
		if (typeof document !== 'undefined') {
			query === ''
				? document.addEventListener('keydown', initialKeyDown)
				: document.removeEventListener('keydown', initialKeyDown);
		}
	}

	onMount(() => {
		const interval = setInterval(() => (time = new Date()), 1000);
		document.addEventListener('keydown', initialKeyDown);

		return () => {
			clearInterval(interval);
			document.removeEventListener('keydown', initialKeyDown);
		};
	});

	$: hours = time.getHours();
	$: minutes = time.getMinutes();
	$: seconds = time.getSeconds();

	const openInTab = (url: string) => window.open(url, '_blank');

	const onSubmit = () => {
		const q = query.trim().toLowerCase();
		// simple open with one letter
		if (q in searchDict) {
			openInTab(searchDict[q].domain);
			query = '';
		}

		// search in a service
		if (/^[a-z]+!.*/.test(q)) {
			console.log('sup');
			const [service, searchQuery] = q.split('!');
			if (service in searchDict) {
				const found = searchDict[service];
				const url =
					found.domain +
					(found.searchSubDomain ? found.searchSubDomain + '/' : '') +
					'?' +
					qs.stringify({
						...found.additionalSearchParams,
						[found.searchParam || 'q']: searchQuery
					});
				openInTab(url);
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
	</form>
{/if}
