<script>
    // Contoh konten sederhana
    let stats = [
        { label: "Users", value: 1200 },
        { label: "Sales", value: 350 },
        { label: "Revenue", value: "$12k" }
    ];
</script>

<section class="p-6 flex-1">
    <h2 class="text-2xl font-bold mb-6">Dashboard Overview</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each stats as stat}
            <div class="bg-white rounded-2xl shadow-md p-6 text-center">
                <h3 class="text-xl font-semibold">{stat.label}</h3>
                <p class="text-3xl font-bold mt-2">{stat.value}</p>
            </div>
        {/each}
    </div>
</section>
