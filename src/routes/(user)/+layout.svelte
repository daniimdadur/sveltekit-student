<script>
    import Footer from "$lib/components/layout/Footer.svelte";
    import Navbar from "$lib/components/layout/Navbar.svelte";
    import Sidebar from "$lib/components/layout/Sidebar.svelte";

    const {children} = $props();
</script>

<div class="flex flex-col min-h-screen">
    <Navbar/>

    <div class="flex flex-1">
        <Sidebar/>
        <div class="container m-4">
            {@render children()}
        </div>
    </div>

    <Footer/>
</div>
