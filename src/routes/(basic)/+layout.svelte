<script>
	import Footer from "$lib/components/layout/Footer.svelte";
	import Sidebar from "$lib/components/layout/Sidebar.svelte";
	import Navbar from "$lib/components/layout/Navbar.svelte";
	let { children } = $props();
</script>

<div class="flex flex-col min-h-screen">
	<Navbar/>

	<div class="flex flex-1">
		<Sidebar/>
		{@render children()}
	</div>

	<Footer/>
</div>
